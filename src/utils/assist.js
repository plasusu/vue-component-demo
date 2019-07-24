function findComponentUpward (context, componentName) {
    let parent = context.$parent;
    let name = parent.$options.name;
  
    while (parent && (!name || [componentName].indexOf(name) < 0)) {
      parent = parent.$parent;
      if (parent) name = parent.$options.name;
    }
    return parent;
}

function findComponentsDownward(context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

function typeOf(obj) {
    const toString = Object.prototype.toString

    const map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    }
    return map[toString.call(obj)]
}

function deepCopy(data) {
    const t = typeOf(data)
    let o

    if (t === 'array') {
        o = []
    } else if (t === 'object') {
        o = {}
    } else {
        return data
    }

    if (t === 'array') {
        data.forEach(v => {
            o.push(deepCopy(v))
        })
    } else if (t === 'object') {
        for (let key in data) {
            o[key] = deepCopy(data[key])
        }
    }

    return o
}

export {
    findComponentUpward,
    findComponentsDownward,
    deepCopy
}