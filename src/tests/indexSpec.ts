import { myFunc } from '../index'

xdescribe('suite description', () => {
    it('expect myFunc(5) to equal 25', () => {
        expect(myFunc(5)).toEqual(25)
    })
})
