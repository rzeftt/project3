class AppConfig {
    readonly port: number = 4091;
    readonly dbConfig = {
        user: 'root',
       host: '54.234.99.29',
        port: 3306,
        password: '',
        database: 'freedom',
    };
}

export const appConfig = new AppConfig();
