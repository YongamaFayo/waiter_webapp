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