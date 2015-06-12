describe('Sample spec', function () {
    describe('jQuery', function () {
        it('should be on the window object', function () {
            expect(window.jQuery).toBeDefined();
        });

        it('should create new object for each get of a feature', function () {
            expect(fixtures.get('sampleFixture')).not.toBe(fixtures.get('sampleFixture'));
        });

        it('should return an equal fixture for each get fixture', function () {
            expect(fixtures.get('sampleFixture')).toEqual(fixtures.get('sampleFixture'));
        });

        it('should have some custom matchers', function () {
            expect(fixtures.get('sampleFixture')).toBeAnArray();
        });
    });
});
