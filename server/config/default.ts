interface defaultConfig{
    corsOrigin: string,
    port: number,
    host: string
}

const config:defaultConfig = {
    //client domain
    corsOrigin: 'http://localhost:3000',
    port: 80,
    host: 'localhost'
}

export default config