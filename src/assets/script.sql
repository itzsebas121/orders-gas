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
    CylinderID INT PRIMARY KEY IDENTITY,
    TypeCylinder NVARCHAR(50) NOT NULL,
    Quantity INT NOT NULL
);
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1), 
    ClientID INT NOT NULL,
    DistributorID INT NOT NULL,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    OrderStatus NVARCHAR(50) NOT NULL,
    Cylinder INT NOT NULL,
    Quantity INT NOT NULL,
    Location NVARCHAR(255),
    FOREIGN KEY (ClientID) REFERENCES Clients(ClientID) 
        ON DELETE CASCADE,
    FOREIGN KEY (DistributorID) REFERENCES Distributors(DistributorID)
        ON DELETE NO ACTION,
    FOREIGN KEY (Cylinder) REFERENCES Cylinders(CylinderID)
        ON DELETE NO ACTION
);

GO
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

CREATE PROCEDURE InsertClient 
    @Name NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Location NVARCHAR(255),
    @UserName NVARCHAR(100),
    @HashedPassword NVARCHAR(100)
AS
BEGIN
    DECLARE @EncryptedPassword VARBINARY(MAX);
    SET @EncryptedPassword = ENCRYPTBYKEY(KEY_GUID('MySymmetricKey'), @HashedPassword);

    INSERT INTO Users (UserType, Username, HashedPassword)
    VALUES ('Client',@UserName, @EncryptedPassword);
    INSERT INTO Clients (Name, LastName, Location, Username)
    VALUES(@Name, @LastName, @Location,@UserName);

END;
GO

EXEC InsertClient @Name = 'sebas', @LastName = 'Tipan', @Location='Quero',  @UserName = 'itzsebas121', @HashedPassword = 'xdsebas12';

GO



INSERT INTO Clients (Name, LastName, Location, Username)
VALUES
('John', 'Doe', '123 Main St','johndoe'),
('Jane', 'Doe', '456 Elm St', 'johndoe2');

INSERT INTO Distributors (Name, LastName, Username)
VALUES
('Distributor', 'One', 'distributor1'),
('Distributor', 'Two', 'distributor2');

INSERT INTO Cylinders (TypeCylinder, Quantity)
VALUES
('Propane', 100),
('Oxygen', 50),
('Nitrogen', 70);

INSERT INTO Orders (ClientID, DistributorID, OrderDate, OrderStatus, Cylinder, Quantity, Location)
VALUES
(1, 1, GETDATE(), 'Pending', 1, 10, '123 Main St'),
(2, 2, GETDATE(), 'Completed', 2, 5, '456 Elm St'),
(1, 2, GETDATE(), 'In Progress', 3, 15, '789 Maple Ave');
GO

CREATE OR ALTER PROCEDURE GetUserInfo
    @Username NVARCHAR(50),
    @Password NVARCHAR(100)
AS
BEGIN
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
        PRINT 'Usuario no encontrado';
        RETURN;
    END
    DECLARE @EncryptedPassword VARCHAR(100);
	OPEN SYMMETRIC KEY MySymmetricKey DECRYPTION BY CERTIFICATE MyCert;
    SET @EncryptedPassword = CONVERT(NVARCHAR(100), DECRYPTBYKEY(@HashedPassword));
    CLOSE SYMMETRIC KEY MySymmetricKey;

    IF @Password != @EncryptedPassword
    BEGIN
		PRINT @EncryptedPassword;
		PRINT @HashedPassword;
        PRINT 'Contraseña incorrecta';
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
END;
GO

EXEC GetUserInfo @Username = 'itzsebas121', @Password = 'xdsebas12';
