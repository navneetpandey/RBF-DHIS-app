(function () {
    var fixtures = {};

    fixtures.sampleFixture = ['a', 'b', 'c'];


    window.fixtures = {
        get: function (fixtureName) {
            if (fixtures[fixtureName])
                return JSON.parse(JSON.stringify(fixtures[fixtureName]));
            throw new Error('Fixture named "' + fixtureName + '" does not exist');
        }
    };

}(window));
