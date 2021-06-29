INSERT INTO public.manufacturers ("name") VALUES
	 ('BMW'),
	 ('GM'),
	 ('Toyota'),
	 ('Nissan'),
	 ('Tesla'),
	 ('Ford');

   INSERT INTO public.users (email,"password","name",birthday,"role") VALUES
	 ('user1@test.com','user1','User 1','1980-12-01','ADMINISTRATOR'),
	 ('user2@test.com','user2','User 2','1985-05-20','VISITOR'),
	 ('user3@test.com','user3','User 3','1970-02-15','VISITOR');

   INSERT INTO public.vehicles (userid,manufacturerid,"year",price,firstowner) VALUES
	 (1,1,1990,1550.00,true),
	 (2,3,2020,95000.02,true),
	 (3,4,2020,95000.02,false),
	 (1,6,2020,95000.02,false),
	 (2,2,2020,95000.02,false);
   