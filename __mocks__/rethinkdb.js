module.exports = {
  connect: jest.fn(() => Promise.resolve({
    close: jest.fn(() => Promise.resolve('closed'))
  }))
}

