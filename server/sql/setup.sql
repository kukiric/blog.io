-- Reseta o banco de dados para o estado inicial
drop table if exists comments;
drop table if exists posts;
drop table if exists users;
drop type if exists user_type_enum;

-- user_type de usuário
-- Nota: enum estática, não-extensível
create type user_type_enum as enum (
    'visitante',
    'contribuidor',
    'admin'
);

-- Tabelas
create table users (
    id bigserial primary key,
    login_name varchar(255) unique not null,
    display_name varchar(255) not null,
    passwd varchar(255) not null,
    user_type user_type_enum not null
);

create table posts (
    id bigserial primary key,
    title varchar(255) not null,
    content text not null,
    id_user bigint not null references users(id),
    post_date date not null
);

create table comments (
    id bigserial primary key,
    id_user bigint not null references users(id),
    id_post bigint not null references posts(id),
    content text not null
);

-- Conta de administrador
insert into users (
    login_name, display_name, passwd, user_type
) values (
    'admin', 'Administrador', 'admin', 'admin'
);

-- Conta de contribuidor
insert into users (
    login_name, display_name, passwd, user_type
) values (
    'ricardo', 'Ricardo Maes', 'passwd', 'contribuidor'
);

-- Conta de visitante
insert into users (
    login_name, display_name, passwd, user_type
) values (
    'visitante', 'Comentador Chato', 'passwd', 'visitante'
);
