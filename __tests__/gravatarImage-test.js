jest.dontMock('../gravatars');

var gravatarImage = require('../gravatars');

describe('gravatarImage', function() {
	it('create an gravatar url for an email-adres', function() {
		expect(gravatarImage('thisisafakeemail@fakedomain.com')).toBe('http://www.gravatar.com/avatar/9400f133af55c7261faf118202f70add.jpg?r=g&s=80');
	});

	it('removes extra spaces out of email', function() {
		expect(gravatarImage('   this  isaf   akee  mail@fakedom   ai  n.c  om')).toBe('http://www.gravatar.com/avatar/9400f133af55c7261faf118202f70add.jpg?r=g&s=80');
	});

	it('gives an error exception when email is not a string', function() {
		expect(function(){ 
			gravatarImage({});
		}).toThrow(new Error('Email must be of type string and must contain an @-sign'));
	});

	it("gives an error exception when email doesn't contain an @-sign", function() {
		expect(function(){ 
			gravatarImage('this is a string without an at-sign');
		}).toThrow(new Error('Email must be of type string and must contain an @-sign'));
	});
});
