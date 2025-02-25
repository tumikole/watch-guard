CREATE TABLE
    client_user (
        user_id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
        username VARCHAR(255) DEFAULT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        cell_number VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    client (
        user_id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
        cell_number VARCHAR(255) NOT NULL,
        password VARCHAR(255) DEFAULT NULL,
        active BOOLEAN DEFAULT FALSE,
        brand VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        username VARCHAR(255) DEFAULT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        reference_number VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    support_user (
        user_id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
        username VARCHAR(255) DEFAULT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        cell_number VARCHAR(255) NOT NULL,
        password VARCHAR(255) DEFAULT NULL,
        active BOOLEAN DEFAULT FALSE,
        brand VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


CREATE TABLE
    user_brand_label_location (
        id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
        brand_name VARCHAR(255) NOT NULL,
        client_email VARCHAR(255) NOT NULL,
        client_location VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );