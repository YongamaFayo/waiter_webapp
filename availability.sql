create table waiters(
    id serial primary key,
    waiters text not null
);

create table weekdays(
    id serial primary key,
    weekdays text not null
);

create table shifts(
    weekdays_id int,
    foreign key (weekdays_id) references weekdays(id),
    waiters_id int,
    foreign key (waiters_id) references waiters(id)
);