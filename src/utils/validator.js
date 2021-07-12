import test from 'uview-ui/libs/function/test'

const strategies = {
  empty(val, errorMsg) {
    if (test.empty(val)) return errorMsg
  },
  emptyString(val, errorMsg) {
    if (val === '') return errorMsg
  },
  min(val, length, errorMsg) {
    if (val.length < length) return errorMsg
  },
  max(val, length, errorMsg) {
    if (val.length > length) return errorMsg
  },
  email(val, errorMsg) {
    if (!test.email(val)) return errorMsg
  },
  mobile(val, errorMsg) {
    if (!test.mobile(val)) return errorMsg
  },
  idCard(val, errorMsg) {
    if (!test.idCard(val)) return errorMsg
  },
  amount(val, errorMsg) {
    if (!test.amount(val)) return errorMsg
  },
  enOrNum(val, errorMsg) {
    if (!test.enOrNum(val)) return errorMsg
  },
}

const Validator = function () {
  this.cache = []
}

Validator.prototype.add = function (item, rules) {
  rules.forEach(rule => {
    const strategySet = rule.strategy.split(':')
    this.cache.push(() => {
      const strategyName = strategySet.shift()
      strategySet.unshift(item)
      strategySet.push(rule.errorMsg)
      return strategies[strategyName].apply(this, strategySet)
    })
  })
}

Validator.prototype.start = function () {
  let errorMsg
  this.cache.some(validatorFunc => {
    errorMsg = validatorFunc()
    if (errorMsg) {
      return true
    }
  })
  return errorMsg
}

export default Validator
