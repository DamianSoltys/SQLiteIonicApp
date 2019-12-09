CREATE TABLE IF NOT EXISTS user(userId INTEGER PRIMARY KEY AUTOINCREMENT ,userName TEXT,password TEXT,email TEXT);
CREATE TABLE IF NOT EXISTS product(productId INTEGER PRIMARY KEY AUTOINCREMENT,productName TEXT,carbs NUMBER,protein NUMBER,fat NUMBER,kcal NUMBER);
CREATE TABLE IF NOT EXISTS calculateHistory(calculateId INTEGER PRIMARY KEY AUTOINCREMENT,userId NUMBER,calculateName TEXT,BMI NUMBER,userWeight NUMBER,userHeight NUMBER,age NUMBER,carbs NUMBER,protein NUMBER,fat NUMBER,kcal NUMBER,historyDate TEXT);
CREATE TABLE IF NOT EXISTS meal(mealId INTEGER PRIMARY KEY AUTOINCREMENT,userId NUMBER,mealName TEXT,carbs NUMBER,protein NUMBER,fat NUMBER,kcal NUMBER,picture TEXT,date TEXT);

INSERT INTO product(productName,carbs,protein,fat,kcal) VALUES ( "Kromka chleba" ,24,3.4,4.5,200);
INSERT INTO product(productName,carbs,protein,fat,kcal) VALUES ( "Sałata" , 10 , 1.4 , 2.5 , 50 );
INSERT INTO product(productName,carbs,protein,fat,kcal) VALUES ( "Pierś z kurczaka" , 90 , 10 , 14.5 , 350 );
INSERT INTO product(productName,carbs,protein,fat,kcal) VALUES ( "Ziemniak" , 54 , 12 , 4.5 , 150 );
INSERT INTO product(productName,carbs,protein,fat,kcal) VALUES ( "chleb" ,25,1.4,2.5,300);
INSERT INTO product(productName,carbs,protein,fat,kcal) VALUES ( "Kukurydza" , 1 , 0.2 , 1.4 , 20 );
INSERT INTO product(productName,carbs,protein,fat,kcal) VALUES ( "Pierś z indyka" , 70 , 12 , 14.5 , 300 );
INSERT INTO product(productName,carbs,protein,fat,kcal) VALUES ( "Burak" , 51 , 11 , 1.5 , 100 );

