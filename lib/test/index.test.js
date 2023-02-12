const inquirer = require('inquirer')
jest.mock(inquirer)

// Test suite
test('prompts for the user input', async () => {
  const answer = 'Hello, world!';
  inquirer.prompt.mockResolvedValue({ answer });

  const prompt = require('./prompt');
  const result = await prompt();

  expect(inquirer.prompt).toHaveBeenCalledWith([{
    type: 'input',
    name: 'answer',
    message: 'What is your message?'
  }]);
  expect(result).toBe(answer);
})