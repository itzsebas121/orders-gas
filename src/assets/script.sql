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
    PhoneNumber Decimal(10,0) NOT NULL,
    FOREIGN KEY (Username) REFERENCES Users(Username)
        ON DELETE CASCADE 
);


CREATE TABLE Distributors (
    DistributorID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Username NVARCHAR(100) NOT NULL UNIQUE, 
    PhoneNumber Decimal(10,0) NOT NULL,
    FOREIGN KEY (Username) REFERENCES Users(Username)
        ON DELETE CASCADE 
);
CREATE TABLE Cylinders (
    CylinderID INT PRIMARY KEY IDENTITY(1,1),
    TypeCylinder NVARCHAR(50) NOT NULL,
    Price float NOT NULL
);
CREATE TABLE Orders (
        OrderID INT PRIMARY KEY IDENTITY(1,1), 
        ClientID INT NOT NULL,
        DistributorID INT NULL,
        OrderDate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET() AT TIME ZONE 'UTC' AT TIME ZONE 'SA Pacific Standard Time',
        OrderStatus NVARCHAR(50) NOT NULL CHECK (OrderStatus IN ('Pendiente', 'En Camino', 'Entregado', 'Cancelado')),
        Location NVARCHAR(255),
        Total FLOAT NULL,
        FOREIGN KEY (ClientID) REFERENCES Clients(ClientID) 
            ON DELETE CASCADE,
        FOREIGN KEY (DistributorID) REFERENCES Distributors(DistributorID)
            ON DELETE NO ACTION
    );

GO


CREATE TABLE DetailStatus (
    DetailStatusID INT IDENTITY(1,1) PRIMARY KEY, 
    OrderID INT NOT NULL,
    StatusDetail NVARCHAR(255) NOT NULL CHECK (StatusDetail IN ('Pendiente', 'En Camino', 'Entregado', 'Cancelado')),
    DateUpdate DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET() AT TIME ZONE 'UTC' AT TIME ZONE 'SA Pacific Standard Time',
    FOREIGN KEY (OrderID) REFERENCES orders(OrderID)
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
    @PhoneNumber Decimal(10,0),
    @HashedPassword NVARCHAR(100),
	@NameLocation NVARCHAR(400)
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

        INSERT INTO Clients (Name, LastName, Location, Username, PhoneNumber, NameLocation)
        VALUES (@Name, @LastName, @Location, @UserName, @PhoneNumber, @NameLocation);

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
    @HashedPassword NVARCHAR(100),
    @PhoneNumber Decimal(10,0)
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

        INSERT INTO Distributors (Name, LastName, Username, PhoneNumber)
        VALUES (@Name, @LastName,  @UserName, @PhoneNumber);

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

EXEC InsertClient @Name = 'sebas', @LastName = 'Tipan', @Location='Quero',  @UserName = 'itzsebas121', @HashedPassword = 'xdsebas12' @PhoneNumber='1234567890';

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
    DECLARE @Location NVARCHAR(50);
    DECLARE @ClientID INT;
    DECLARE @DistributorID INT;
    DECLARE @HashedPassword VARBINARY(MAX);
	DECLARE @NameLocation NVARCHAR(400);
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
            @ClientID = ClientID,
			@Location = Location,
			@NameLocation = NameLocation
        FROM Clients
        WHERE Username = @Username;

        SELECT 
            @Username AS Username,
            @UserType AS UserType,
            @ClientID AS ClientID,
			@Location as Location,
			@NameLocation as NameLocation;
			
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



CREATE or alter PROCEDURE Insert_Order
    @ClientID INT,
    @Location NVARCHAR(255),
	@LocationName NVARCHAR(500)
AS
BEGIN
    Declare @NewOrderID INT;
    INSERT INTO Orders (ClientID , OrderStatus, Location, LocationCurrent, Total, LocationName)
    VALUES (@ClientID, 'Pendiente', @Location,@Location, 0, @LocationName);
    SET @NewOrderID = SCOPE_IDENTITY();
	INSERT INTO DetailStatus (OrderID, StatusDetail) 
	VALUES (@NewOrderID, 'Pendiente');
    select @NewOrderID as NewOrderID;
END;

EXEC Insert_Detail_Order
    @Order_ID = 1, 
    @Cylinder_id = 1,
    @Quantiti_cylinders = 3;,
    @LocationName = "hjsdjshjd"



CREATE VIEW vwOrdersDetails AS  
SELECT   
    CASE WHEN o.OrderStatus = 'Pendiente' THEN 'Pedido pendiente' ELSE d.Name END AS Name,  
    CASE WHEN o.OrderStatus = 'Pendiente' THEN '' ELSE d.LastName END AS LastName,  
    CASE WHEN o.OrderStatus = 'Pendiente' THEN '000 000 000' ELSE CAST(d.PhoneNumber AS nvarchar(10)) END AS PhoneNumber, 
    o.OrderID,   
    o.ClientID,   
    o.OrderDate,   
    o.OrderStatus,  
	o.LocationName,
    o.Location,
	o.LocationCurrent,
    o.Total AS OrderTotal,   
    (SELECT   
        od.OdId,   
        cy.TypeCylinder,   
        od.Quantity,   
        cy.Price,  
        od.Total AS DetailTotal  
     FROM Orders_details od  
     INNER JOIN Cylinders cy ON od.Cylinder = cy.CylinderID  
     WHERE od.OrderID = o.OrderID  
     FOR JSON PATH) AS OrderDetails  
FROM Orders o
LEFT JOIN Distributors d ON o.DistributorID = d.DistributorID;





create  view vwSummaryClient as
SELECT 
    c.Name,
    c.LastName,
    c.ClientID,
    COALESCE(COUNT(o.OrderID), 0) AS TotalOrders, 
    COALESCE(SUM(CASE WHEN o.OrderStatus = 'Entregado' THEN 1 ELSE 0 END), 0) AS PedidosEntregados, 
    COALESCE(SUM(CASE WHEN o.OrderStatus = 'Entregado' THEN o.Total ELSE 0 END), 0) AS GastoTotal
FROM Clients c
LEFT JOIN orders o ON o.ClientID = c.ClientID
GROUP BY c.ClientID, c.Name, c.LastName;


CREATE OR ALTER PROCEDURE SetOrderInTransit
        @OrderID INT,
        @DistributorID INT,
		@Location_Current NVARCHAR(100)
    AS
    BEGIN
        IF EXISTS (SELECT 1 FROM orders WHERE OrderID = @OrderID)
        BEGIN

            UPDATE orders
    SET 
        OrderStatus = 'En Camino', 
        DistributorID = @DistributorID, 
        OrderDate = DATEADD(HOUR, -0, GETUTCDATE()),
		LocationCurrent = @Location_Current
    WHERE 
        OrderID = @OrderID;

            INSERT INTO DetailStatus (OrderID, StatusDetail) values ( @OrderID, 'En Camino');
        END
        ELSE
        BEGIN
            PRINT 'El pedido no existe.';
        END
    END;
    GO
    CREATE OR ALTER PROCEDURE CancelOrder
        @OrderID INT
    AS
BEGIN

    IF EXISTS (SELECT 1 FROM orders WHERE OrderID = @OrderID)
    BEGIN

        UPDATE orders
        SET OrderStatus = 'Cancelado' 
        WHERE OrderID = @OrderID
		INSERT INTO DetailStatus (OrderID, StatusDetail)  VALUES ( @OrderID, 'Cancelado');

    END
    ELSE
    BEGIN
        PRINT 'El pedido no existe.';
    END
END;
GO
CREATE OR ALTER PROCEDURE MarkOrderAsDelivered
    @OrderID INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM orders WHERE OrderID = @OrderID)
    BEGIN
        UPDATE orders
        SET OrderStatus = 'Entregado'
        WHERE OrderID = @OrderID;
		INSERT INTO DetailStatus (OrderID, StatusDetail)  VALUES ( @OrderID, 'Entregado');
      
    END
    ELSE
    BEGIN
        PRINT 'El pedido no existe.';
    END
END;
GO

create VIEW vwGetNewOrders
as
SELECT 
O.OrderID,
c.ClientID,
c.Name, 
c.LastName, 
o.Total, 
o.LocationName 
,(SELECT   
        cy.TypeCylinder,   
        od.Quantity   
     FROM Orders_details od  
     INNER JOIN Cylinders cy ON od.Cylinder = cy.CylinderID  
     WHERE od.OrderID = o.OrderID  
     FOR JSON PATH) AS OrderDetails 
from Orders o
LEFT join Clients c on o.ClientID = c.ClientID  
where o.OrderStatus = 'Pendiente'

GO

CREATE VIEW vwGetCurrentOrdersDistributor
as
SELECT 
O.OrderID,
o.DistributorID,
c.Name, 
c.LastName, 
c.PhoneNumber,
o.Total
,(SELECT   
        cy.TypeCylinder,   
        od.Quantity   
     FROM Orders_details od  
     INNER JOIN Cylinders cy ON od.Cylinder = cy.CylinderID  
     WHERE od.OrderID = o.OrderID  
     FOR JSON PATH) AS OrderDetails 
from Orders o
LEFT join Clients c on o.ClientID = c.ClientID  
where o.OrderStatus = 'En Camino'

GO
CREATE VIEW vwDistributorHistory
as
SELECT 
    o.OrderID,
    o.OrderDate,
    o.OrderStatus,
    c.Name AS ClientName,
    c.LastName AS ClientLastName,
    o.LocationName,
    o.Total AS OrderTotal
FROM 
    Orders o
JOIN 
    Clients c ON o.ClientID = c.ClientID
JOIN 
    Distributors d ON o.DistributorID = d.DistributorID
	