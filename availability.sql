create table waiters(
    id serial primary key,
    waiters text not null
);

create table weekdays(
    id serial primary key,
    weekdays text not null
);

create table shifts(
    weekdays_name text not null,
    -- foreign key (weekdays_name) references weekdays(weekdays),
    waiters_name text not null
    -- foreign key (waiters_name) references waiters(waiters)
);

insert into weekdays (weekdays) values ('sunday');
insert into weekdays (weekdays) values ('monday');
insert into weekdays (weekdays) values ('tuesday');
insert into weekdays (weekdays) values ('wednsday');
insert into weekdays (weekdays) values ('thursday');
insert into weekdays (weekdays) values ('friday');
insert into weekdays (weekdays) values ('saturday');