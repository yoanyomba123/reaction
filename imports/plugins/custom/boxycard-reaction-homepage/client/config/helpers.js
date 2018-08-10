export const combineStyles = (arr) => {
  return Object.assign({}, ...arr)
}
export const checkStr = (str) => {
  let newStr = ""
  if (str && str.length > 0) {
    newStr = str
  }
  return newStr
}

export const getChildNew = ({ obj, propName, isObj, isArr }) => {
  if (obj && obj[propName]) {
    return obj[propName]
  }
  if (isObj) {
    return {}
  }
  if (isArr) {
    return []
  }
  return ''
}

export const timeAgo = (date) => {
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    if (interval === 1) {
      return interval + " year";
    }
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    if (interval === 1) {
      return interval + " month";
    }
      return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    if (interval === 1) {
      return interval + " day";
    }
      return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    if (interval === 1) {
      return interval + " hour";
    }
      return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    if (interval === 1) {
      return interval + " minute";
    }
      return interval + " minutes";
  }
  if (interval === 1) {
    return interval + " second";
  }
  return Math.floor(seconds) + " seconds";
}

export const capitalize = (string = '') => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getNumbers = (str) => {
  let newStr = str.match(/\d/g);
  newStr = newStr.join("");
  return newStr;
}

export const numToString = (num) => {
  if (num) {
    return num.toFixed(2)
  }
  return '0'
}
export const isString = (str) => {
  if (str) {
    const letters = /^[a-zA-Z\s]*$/;
    if(str.match(letters)) {
      return true;
    }
  }
  return false;
}

export const isStringNotEmpty = (str) => {
  let notEmpty = false
  if (str && str.length > 0) {
    notEmpty = true
  }
  return notEmpty
}
export const isStrongPassword = (password) => {
  if (password && password.length >= 8) {
    const hasNumber = password.match(/\d+/g)
    if (hasNumber !== null) {
      const passwordLowerCase = password.toLowerCase()
      if (passwordLowerCase.indexOf('password') === -1 || passwordLowerCase.indexOf('qwerty') === -1) {
        const removedSpace = password.replace(/\s/g,'')
        if (removedSpace.length === password.length) {
          if (passwordLowerCase !== password) {
            return {
              isStrong: true,
              msg: "It's a strong password!"
            }
          } else {
            return {
              isStrong: false,
              msg: "Please, include a uppercase letter!"
            }
          }
        } else {
          return {
            isStrong: false,
            msg: "Please, don't include spaces!"
          }
        }
      } else {
        return {
          isStrong: false,
          msg: "Please, don't include unsafe words!"
        }
      }
    } else {
      return {
        isStrong: false,
        msg: "Please, include at least a number!"
      }
    }
  }
  return {
    isStrong: false,
    msg: 'Please, at least 8 characters',
  }
}
export const isNumber = (str) => {
  if (str) {
    const numbers = /\d/g;
    const newStr = str.match(numbers);
    if(str.length === newStr.length) {
      return true;
    }
  }
  return false;
}
