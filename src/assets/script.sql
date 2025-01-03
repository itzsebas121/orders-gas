CREATE DATABASE PedidosGas;
GO

USE PedidosGas;
GO
CREATE TABLE Users (
    Username NVARCHAR(100) PRIMARY KEY,
    UserType NVARCHAR(20) NOT NULL CHECK (UserType IN ('Client', 'Distributor')),
    HashedPassword VARBINARY(MAX) NOT NULL
);

CREATE TABLE Clients (
    ClientID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Location NVARCHAR(255),
    Username NVARCHAR(100)  NOT NULL UNIQUE, 
    FOREIGN KEY (Username) REFERENCES Users(Username)
        ON DELETE CASCADE 
);


CREATE TABLE Distributors (
    DistributorID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Username NVARCHAR(100) NOT NULL UNIQUE, 
    FOREIGN KEY (Username) REFERENCES Users(Username)
        ON DELETE CASCADE 
);
CREATE TABLE Cylinders (
    CylinderID INT PRIMARY KEY IDENTITY(1,1),
    TypeCylinder NVARCHAR(50) NOT NULL,
    Price float NOT NULL
);
CREATE or alter TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1), 
    ClientID INT NOT NULL,
    DistributorID INT NULL,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    OrderStatus NVARCHAR(50) NOT NULL CHECK (OrderStatus IN ('Pendiente', 'En Camino', 'Entregado', 'Cancelado')),
    Location NVARCHAR(255),
    Location_Delivery NVARCHAR(255),
    Total FLOAT NULL,
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID) 
        ON DELETE CASCADE,
    FOREIGN KEY (DistributorID) REFERENCES Distributors(DistributorID)
        ON DELETE NO ACTION,
);

GO
CREATE TABLE Orders_details (
    OdId INT PRIMARY KEY IDENTITY(1,1), 
    OrderID INT NOT NULL,
    Cylinder INT NOT NULL,
    Quantity INT NOT NULL,
    Total FLOAT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) 
        ON DELETE CASCADE,
    FOREIGN KEY (Cylinder) REFERENCES Cylinders(CylinderID)
        ON DELETE NO ACTION
);

CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'proyecto';
GO

CREATE CERTIFICATE MyCert
WITH SUBJECT = 'proyecto';
GO

CREATE SYMMETRIC KEY MySymmetricKey
WITH ALGORITHM = AES_256
ENCRYPTION BY CERTIFICATE MyCert;
GO
OPEN SYMMETRIC KEY MySymmetricKey
    DECRYPTION BY CERTIFICATE MyCert;
GO

CREATE OR ALTER PROCEDURE InsertClient 
    @Name NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Location NVARCHAR(255),
    @UserName NVARCHAR(100),
    @HashedPassword NVARCHAR(100)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
		OPEN SYMMETRIC KEY MySymmetricKey DECRYPTION BY CERTIFICATE MyCert;
        DECLARE @EncryptedPassword VARBINARY(MAX);
        SET @EncryptedPassword = ENCRYPTBYKEY(KEY_GUID('MySymmetricKey'), @HashedPassword);
		CLOSE SYMMETRIC KEY MySymmetricKey;

        INSERT INTO Users (UserType, Username, HashedPassword)
        VALUES ('Client', @UserName, @EncryptedPassword);

        INSERT INTO Clients (Name, LastName, Location, Username)
        VALUES (@Name, @LastName, @Location, @UserName);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        IF ERROR_NUMBER() = 2627 OR ERROR_NUMBER() = 2601
        BEGIN
            RAISERROR('Error: El usuario ya existe.', 16, 1);
        END
        ELSE
        BEGIN
            THROW;
        END
    END CATCH
END;
GO
CREATE OR ALTER PROCEDURE InsertDistributor
    @Name NVARCHAR(100),
    @LastName NVARCHAR(100),
    @UserName NVARCHAR(100),
    @HashedPassword NVARCHAR(100)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
		OPEN SYMMETRIC KEY MySymmetricKey DECRYPTION BY CERTIFICATE MyCert;
        DECLARE @EncryptedPassword VARBINARY(MAX);
        SET @EncryptedPassword = ENCRYPTBYKEY(KEY_GUID('MySymmetricKey'), @HashedPassword);
		CLOSE SYMMETRIC KEY MySymmetricKey;

        INSERT INTO Users (UserType, Username, HashedPassword)
        VALUES ('Distributor', @UserName, @EncryptedPassword);

        INSERT INTO Distributors (Name, LastName, Username)
        VALUES (@Name, @LastName,  @UserName);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;

        IF ERROR_NUMBER() = 2627 OR ERROR_NUMBER() = 2601
        BEGIN
            RAISERROR('Error: El usuario ya existe.', 16, 1);
        END
        ELSE
        BEGIN
            THROW;
        END
    END CATCH
END;
GO

EXEC InsertClient @Name = 'sebas', @LastName = 'Tipan', @Location='Quero',  @UserName = 'itzsebas121', @HashedPassword = 'xdsebas12';
EXEC InsertDistributor @Name = 'distribuidor1', @LastName = 'Lopez',  @UserName = 'dis1', @HashedPassword = 'distribuidor1';

GO

INSERT INTO Cylinders (TypeCylinder, Quantity)
VALUES
('Propane', 100),
('Oxygen', 50),
('Nitrogen', 70);

INSERT INTO Orders (ClientID, DistributorID, OrderDate, OrderStatus, Cylinder, Quantity, Location)
VALUES
(1, 1, GETDATE(), 'Pending', 1, 10, '123 Main St'),
(1, 1, GETDATE(), 'Completed', 2, 5, '456 Elm St'),
(1, 1, GETDATE(), 'In Progress', 3, 15, '789 Maple Ave');
GO

CREATE OR ALTER PROCEDURE GetUserInfo
    @Username NVARCHAR(50),
    @Password NVARCHAR(100)
AS
BEGIN TRY
    DECLARE @UserType NVARCHAR(50);
    DECLARE @ClientID INT;
    DECLARE @DistributorID INT;
    DECLARE @HashedPassword VARBINARY(MAX);
    SELECT 
        @UserType = UserType,
        @HashedPassword = HashedPassword
    FROM Users
    WHERE UserName = @Username;

    IF @HashedPassword IS NULL
    BEGIN
        RAISERROR('Usuario no encontrado', 16, 1);
        RETURN;
    END
    DECLARE @EncryptedPassword VARCHAR(100);
	OPEN SYMMETRIC KEY MySymmetricKey DECRYPTION BY CERTIFICATE MyCert;
    SET @EncryptedPassword = CONVERT(NVARCHAR(100), DECRYPTBYKEY(@HashedPassword));
    CLOSE SYMMETRIC KEY MySymmetricKey;

    IF @Password != @EncryptedPassword
    BEGIN
        RAISERROR ('Contraseña Incorrecta', 16, 1);
        RETURN;
    END

    IF @UserType = 'Client'
    BEGIN
        SELECT 
            @ClientID = ClientID
        FROM Clients
        WHERE Username = @Username;

        SELECT 
            @Username AS Username,
            @UserType AS UserType,
            @ClientID AS ClientID;
			
    END
    ELSE IF @UserType = 'Distributor'
    BEGIN
        SELECT 
            @DistributorID = DistributorID
        FROM Distributors
        WHERE Username = @Username;

        SELECT 
            @Username AS Username,
            @UserType AS UserType,
            @DistributorID AS DistributorID;
    END
    ELSE
    BEGIN
        PRINT 'Tipo de usuario no válido';
    END
END TRY
BEGIN CATCH
    SELECT ERROR_MESSAGE() AS ErrorMessage;
END CATCH;
GO
EXEC GetUserInfo @Username = 'itzsebas121', @Password = 'xdsebas12';



CREATE or alter PROCEDURE Insert_Detail_Order
    @Order_ID int,
	@Cylinder_id int,
	@Quantiti_cylinders int
AS
BEGIN
	DECLARE @Price_cylinder float;
	DECLARE @TotalOrderDetail float;


	SELECT @Price_cylinder = Price
	from Cylinders
	where CylinderID = @Cylinder_id;
	

	SET @TotalOrderDetail = @Price_cylinder * @Quantiti_cylinders;

    INSERT INTO Orders_details(OrderID, Cylinder,Quantity, Total)
	values (@Order_ID, @Cylinder_id, @Quantiti_cylinders,@TotalOrderDetail );

	update orders
	set Total = Total + @TotalOrderDetail
	where OrderID = @Order_ID;
END;


EXEC Insert_Detail_Order
    @Order_ID = 1, 
    @Cylinder_id = 1,
    @Quantiti_cylinders = 3; 


CREATE or alter PROCEDURE Insert_Order
    @ClientID INT,
    @DistributorID INT,
    @OrderStatus NVARCHAR(50),
    @Location NVARCHAR(255),
	 @Location_Geographic NVARCHAR(250)
AS
BEGIN
    Declare @NewOrderID INT;
    INSERT INTO Orders (ClientID, DistributorID, OrderStatus, Location, Location_Delivery, Total)
    VALUES (@ClientID, @DistributorID, @OrderStatus, @Location,@Location_Geographic, 0);
    SET @NewOrderID = SCOPE_IDENTITY();
    select @NewOrderID as NewOrderID;
END;
exec Insert_Order
    @ClientID =1,
    @DistributorID =1,
    @OrderStatus ='Cancelado',
    @Location='Quero',
	 @Location_Geographic ='-4545454,-4545'