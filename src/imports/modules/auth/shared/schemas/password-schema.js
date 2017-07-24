import SimpleSchema from 'simpl-schema';

const passwordSchema = new SimpleSchema({
  password: {
    label: 'password',
    type: String,
    required: true,
    min: 8,
    max: 16,
    custom: function () {
      const capitals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      const specialCharacters = ['?', '!', '@', '#', '$', '%', '&', '<', '>', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', '/', '\\', ',', '.', '`', '~'];
      const requiredCapitals = 1;
      const requiredLowercase = 1;
      const requiredSpecialCharacters = 1;
      let numCapitals = 0;
      let numLowercase = 0;
      let numSpecialCharacters = 0;
      Array.from(this.value).forEach((letter) => {
        if (capitals.indexOf(letter) !== -1) {
          numCapitals++;
        }
        if (lowercase.indexOf(letter) !== -1) {
          numLowercase++;
        }
        if (specialCharacters.indexOf(letter) !== -1) {
          numSpecialCharacters++;
        }
      });

      if (numCapitals < requiredCapitals ||
        numLowercase < requiredLowercase ||
        numSpecialCharacters < requiredSpecialCharacters) {
        return SimpleSchema.ErrorTypes.VALUE_NOT_ALLOWED;
      }
      return undefined;
    }
  }
});
console.log('--valid=', passwordSchema.validate({ password: 'a!bcDefgh' }));

export {
  passwordSchema
};
