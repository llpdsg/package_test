/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (props, objArr) => {
  return objArr.map(item => {
    let obj = {}
    for (const key in item) {
      if (!props.includes(key)) {
        obj[key] = item[key]
      }
    }
    return obj
  })
};
exports.excludeByProperty = (opt, arr) => {
  let result = []
  arr.forEach(item => {
    !item[opt] && result.push(item)
  })
  return result
};
exports.sumDeep = (arr) => {
  return arr.map(item => {
    return {objects: item.objects.reduce((prev, curr) => {
        let val = curr.val
        return val + prev
      }, 0)}
  })
};
exports.applyStatusColor = (color, status) => {
  let result = []
  status.forEach(item => {
    for (let key in color) {
      color[key].includes(item.status) ? result.push({...item, color: key}) : null
    }
  })
  return result
};
exports.createGreeting = (func, greeting) => {
  return (name) => {
    return func(greeting, name)
  }
};
exports.setDefaults = (defaultObj) => {
  return (userObj) => {
    return {
      ...defaultObj,
      ...userObj
    }
  }
};
exports.fetchUserByNameAndUsersCompany = (name, funcObj) => {
  return new Promise(resolve => {
    (async () => {
      const users = await funcObj.fetchUsers()
      const user = users.find(item => item.name === name)
      const company = await funcObj.fetchCompanyById(user.companyId).then(companyInfo => {
        return companyInfo
      })
      funcObj.fetchStatus().then(status => {
        resolve({
          company,
          status,
          user
        })
      })
    })()
  })
};
