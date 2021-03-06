USE [master]
GO
/****** Object:  Database [companydb]    Script Date: 27.06.2020 0:20:42 ******/
CREATE DATABASE [companydb] ON  PRIMARY 
( NAME = N'companydb', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\companydb.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'companydb_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\companydb_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [companydb] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [companydb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [companydb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [companydb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [companydb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [companydb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [companydb] SET ARITHABORT OFF 
GO
ALTER DATABASE [companydb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [companydb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [companydb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [companydb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [companydb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [companydb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [companydb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [companydb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [companydb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [companydb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [companydb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [companydb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [companydb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [companydb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [companydb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [companydb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [companydb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [companydb] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [companydb] SET  MULTI_USER 
GO
ALTER DATABASE [companydb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [companydb] SET DB_CHAINING OFF 
GO
USE [companydb]
GO
/****** Object:  Table [dbo].[company]    Script Date: 27.06.2020 0:20:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[company](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nchar](100) NOT NULL,
	[size] [int] NULL,
	[form_incorporation] [nchar](45) NOT NULL,
 CONSTRAINT [PK_company] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[employee]    Script Date: 27.06.2020 0:20:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[surname] [nchar](45) NOT NULL,
	[name] [nchar](45) NOT NULL,
	[middle_name] [nchar](45) NULL,
	[employment_date] [nchar](45) NOT NULL,
	[position] [nchar](45) NOT NULL,
	[company_id] [int] NOT NULL,
 CONSTRAINT [PK_employee] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [companydb] SET  READ_WRITE 
GO
