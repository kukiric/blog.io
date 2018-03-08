-- Reseta o banco de dados para o estado inicial
drop table if exists comentarios;
drop table if exists posts;
drop table if exists usuarios;
drop type if exists tipo_usuario;

-- Tipo de usuário
-- Nota: enum estática, não-extensível
create type tipo_usuario as enum (
    'visitante',
    'contribuidor',
    'admin'
);

-- Tabelas
create table usuarios (
    id bigserial primary key,
    nomeLogin varchar(255) unique not null,
    nomeDisplay varchar(255) not null,
    senha varchar(255) not null,
    tipo tipo_usuario not null
);

create table posts (
    id bigserial primary key,
    titulo varchar(255) not null,
    conteudo text not null,
    id_usuario bigint not null references usuarios(id)
);

create table comentarios (
    id bigserial primary key,
    id_usuario bigint not null references usuarios(id),
    id_post bigint not null references posts(id)
);

-- Conta de administrador
insert into usuarios (
    nomeLogin, nomeDisplay, senha, tipo
) values (
    'admin', 'Administrador', 'admin', 'admin'
);

-- Conta de contribuidor
insert into usuarios (
    nomeLogin, nomeDisplay, senha, tipo
) values (
    'ricardo', 'Ricardo Maes', 'senha', 'contribuidor'
);

-- Conta de visitante
insert into usuarios (
    nomeLogin, nomeDisplay, senha, tipo
) values (
    'visitante', 'Comentador Chato', 'senha', 'visitante'
);
