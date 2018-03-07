-- Tabelas
create table usuario (
    id serial primary key,
    nomeLogin varchar(255) unique not null,
    nomeDisplay varchar(255) not null,
    senha varchar(255) not null
);

create table post (
    id serial primary key,
    titulo varchar(255) not null,
    conteudo text not null,
    id_usuario bigint not null references usuario(id)
);

-- Conta de administrador
insert into usuario (
    nomeLogin, nomeDisplay, senha
) values (
    "admin", "O Administrador", "admin"
);