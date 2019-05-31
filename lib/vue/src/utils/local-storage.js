
/* 储存localStorage */
const setStore = (name, value) => {
    if (!name) {
        return false;
    }
    if (typeof value !== 'string') {
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);
    return true
};
/*
获取指定的localstorage */
const getStore = (name) => {
    if (!name) return false;
    try {
        if (window.localStorage.getItem(name)) {
            try {
                return JSON.parse(window.localStorage.getItem(name));
            } catch (error) {
                return '';
            }
        }
    } catch (error) {
        console.log(error);
    }
    return false;
};

/* 删除指定的localStorage */
const removeStore = (name) => {
    if (!name || !window.localStorage.getItem(name)) return false;
    window.localStorage.removeItem(name);
    return true
};

export default {
    setStore,
    getStore,
    removeStore,
};
