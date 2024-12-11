drop database libms;

create database libms;
use libms;

create table users(
	user_id int primary key auto_increment not null,
    fname varchar(20) not null,
    lname varchar(20) not null,
    address varchar(100) not null,
    NIC varchar(20) not null,
    email varchar(50) not null,
    password varchar(30) not null,
    contact_no varchar(15) not null,
    position varchar(20) not null,
    createdAt timestamp,
    updatedAt timestamp
);

create table authors(
	author_id int primary key auto_increment not null,
    author_name varchar(50) not null
);

create table books(
	book_id int primary key auto_increment not null,
    book_name varchar(50) not null,
    ISBN varchar(50) not null,
    author_id int not null,
    foreign key (author_id) references authors(author_id)
);

create table borrowers(
	borrower_id int primary key auto_increment not null,
    fname varchar(20) not null,
    lname varchar(20) not null,
    address varchar(100) not null,
    NIC varchar(20) not null,
    email varchar(50) not null,
	contact_no varchar(15) not null
);

create table borrowed_books(
	bb_id int primary key auto_increment not null,
    borrower_id int not null,
    book_id int not null,
    borrowed_date DATE,
    return_date DATE,
    isReturned bool default false,
    foreign key (borrower_id) references borrowers(borrower_id),
    foreign key (book_id) references books(book_id)
);

create table fines(
	fine_id int primary key auto_increment not null,
    bb_id int not null,
    fine_amount decimal(10,2), -- rs 20 for extra day
    foreign key (bb_id) references borrowed_books(bb_id)
);


