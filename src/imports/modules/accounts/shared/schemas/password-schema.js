import SimpleSchema from 'simpl-schema';

const passwordSchema = new SimpleSchema({
  password: {
    label: 'password',
    type: String,
    required: true,
    min: 8,
    max: 16,
    custom: function () {
      const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      const specialCharacters = ['?', '!', '@', '#', '$', '%', '&', '<', '>', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', '/', '\\', ',', '.', '`', '~'];
      const requiredUppsercase = 1;
      const requiredLowercase = 1;
      const requiredSpecialCharacters = 1;
      let numUppercase = 0;
      let numLowercase = 0;
      let numSpecialCharacters = 0;
      Array.from(this.value).forEach((letter) => {
        if (uppercase.indexOf(letter) !== -1) {
          numUppercase++;
        }
        if (lowercase.indexOf(letter) !== -1) {
          numLowercase++;
        }
        if (specialCharacters.indexOf(letter) !== -1) {
          numSpecialCharacters++;
        }
      });

      if (numUppercase < requiredUppsercase ||
        numLowercase < requiredLowercase ||
        numSpecialCharacters < requiredSpecialCharacters) {
        return SimpleSchema.ErrorTypes.VALUE_NOT_ALLOWED;
      }
      return undefined;
    }
  }
});
// passwordSchema.summary = 'Passwords must be between 8 and 16 characters long, and should include at least one lowercase letter, one uppercase letter, and one special character.';
passwordSchema.summary = 'Must be 8-16 characters, include at least one lowercase letter, one uppercase letter, one special character';

export {
  passwordSchema
};
