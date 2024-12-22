class AppConfig {
    readonly port: number = 4091;
    readonly dbConfig = {
        user: 'root',
       host: 'freedom-db.c56gwmwoeix6.us-east-1.rds.amazonaws.com',
        port: 3306,
        password: 'rzf1024+_',
        database: 'freedom-db',
    };
}

export const appConfig = new AppConfig();
