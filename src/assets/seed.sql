CREATE TABLE IF NOT EXISTS user(userId INTEGER PRIMARY KEY AUTOINCREMENT ,userName TEXT,password TEXT,email TEXT);
CREATE TABLE IF NOT EXISTS product(productId INTEGER PRIMARY KEY AUTOINCREMENT,productName TEXT,wegle NUMBER,bialko NUMBER,tluszcze NUMBER,kcal NUMBER);
CREATE TABLE IF NOT EXISTS history(historyId INTEGER PRIMARY KEY AUTOINCREMENT,userId NUMBER,historyName TEXT,wegle NUMBER,bialko NUMBER,tluszcze NUMBER,kcal NUMBER);

INSERT INTO product(productName,wegle,bialko,tluszcze,kcal) VALUES ( "Kromka chleba" ,24,3.4,4.5,200);
INSERT INTO product(productName,wegle,bialko,tluszcze,kcal) VALUES ( "Sałata" , 10 , 1.4 , 2.5 , 50 );
INSERT INTO product(productName,wegle,bialko,tluszcze,kcal) VALUES ( "Pierś z kurczaka" , 90 , 10 , 14.5 , 350 );
INSERT INTO product(productName,wegle,bialko,tluszcze,kcal) VALUES ( "Ziemniak" , 54 , 12 , 4.5 , 150 );

