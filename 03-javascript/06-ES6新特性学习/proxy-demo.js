const target = {
    name: 'Billy Bob',
    age: 15
};

const handler = {
    get(target, key, proxy) {
        const today = new Date();
        console.log(`GET request made for ${key} at ${today}`);

        return Reflect.get(target, key, proxy);
    }
};

const proxy = new Proxy(target, handler);

proxy.name;