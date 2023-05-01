CREATE TABLE categorias (
                id_categoria SERIAL PRIMARY KEY,
                nombre_categoria VARCHAR NOT NULL UNIQUE
);

CREATE TABLE productos (
                id_producto SERIAL PRIMARY KEY,
                nombre_producto VARCHAR NOT NULL UNIQUE,
                precio_unitario REAL NOT NULL,
                id_categoria INTEGER,
                descripcion VARCHAR,
                total INTEGER, 
                imagen VARCHAR             
);

alter table productos
    add constraint fk_id_categoria
    foreign key (id_categoria) 
    REFERENCES categorias (id_categoria);

CREATE TABLE lotes (
                id_lote SERIAL PRIMARY KEY,
                id_producto INTEGER,
                costo_unitario REAL NOT NULL,
                costo_total REAL NOT NULL,
                cantidad INTEGER NOT NULL,                
                fecha_caducidad DATE
);

alter table lotes 
    add constraint fk_id_producto
    foreign key (id_producto) 
    REFERENCES productos (id_producto);