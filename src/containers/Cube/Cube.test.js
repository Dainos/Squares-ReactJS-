import React from 'react';
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cube from './Cube';

configure({
  adapter: new Adapter()
})

describe('Table element working', () => {



  let squares, rows, cells, app, addBtn, addRowBtn, addColumnBtn, removeBtn, removeRowBtn, removeColumnBtn;
  
  const initialHeight = 4, initialWidth = 4  


  const updateTable = () => {
    squares = app.find('Squares')
    rows = squares.find('.row')
    cells = squares.find('.cell')

  }
  

  beforeEach(() => {

      app = mount(<Cube initialWidth = {initialWidth} initialHeight = {initialHeight}/>)
      

      addBtn = app.find('AddButton')

      addColumnBtn = addBtn.find('button').first()

      addRowBtn = addBtn.find('button').last()


      removeBtn = app.find('RemoveButton')

      removeColumnBtn = removeBtn.find('button').first()

      removeRowBtn = removeBtn.find('button').last()


      squares = app.find('Squares')

      rows = squares.find('.row'); 

      cells = squares.find('.cell');   

  })

  it ('correct rows amount', () => { 
      expect(rows.length).toEqual(initialHeight);
  })

  it ('correct columns amount', () => {
      expect(cells.length/initialHeight).toEqual(initialWidth);
  })

  it ('correct adding rows', () => {
      addRowBtn.simulate('mouseDown')
      updateTable()
      expect(rows.length).toEqual(initialHeight+1);
  })

  it ('correct adding columns', () => {
      addColumnBtn.simulate('mouseDown')
      updateTable()
      expect(cells.length/initialHeight).toEqual(initialWidth+1)
  })

  it ('correct removing rows', () => {
      removeRowBtn.simulate('mouseDown')
      updateTable()
      expect(rows.length).toEqual(initialHeight-1);
  })

  it ('correct removing columns', () => {
      removeColumnBtn.simulate('mouseDown')
      updateTable()
      expect(cells.length/initialHeight).toEqual(initialWidth-1)
  })


  it ('do not remove last row', () => {
      for (let i = 0; i < initialHeight; i++){
          removeRowBtn.simulate('mouseDown')
      }
      updateTable()
      expect(rows.length).toEqual(1);
  })

  it ('do not remove last column', () => {
      for (let i = 0; i < initialHeight; i++){
          removeColumnBtn.simulate('mouseDown')
      }
      updateTable()
      expect(cells.length/initialHeight).toEqual(1)
  })
})
