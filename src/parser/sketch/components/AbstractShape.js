import React from 'react';

import AbstractComponent, { initAbstractComponent } from './AbstractComponent';

initAbstractComponent();

export default class AbstractShape extends AbstractComponent {
  constructor(data){
    super(data);
    this.class = 'shape';
    switch(data._class){
      case 'star':
      case 'polygon':
      case 'triangle':
      case 'rectangle':
      case 'oval':
      case 'shapePath':
        this.path = this.calculateSVGforSingleShape(data);
        this.svgComponent = (
          <path d={this.path}/>
        )
      break;
      default:
    this.path = this.calculateSVGforShapeGroup(data);
        this.svgComponent = (
          <path d={this.path}/>
        )
      break;
    }

  }

  calculateSVGforSingleShape(data){
    let frame = { ...data.frame, x:0, y:0};
    return this.createPathCode(data,frame);
  }

  calculateSVGforShapeGroup(data){
    return data.layers.map( shape => this.createPathCode(shape, shape.frame)).join(' ');
  }

  convertPoint(point,frame){
      let newPoint = {...point};
      newPoint.point = this.extractPoints(point.point,frame)
      newPoint.curveFrom = this.extractPoints(point.curveFrom,frame)
      newPoint.curveTo = this.extractPoints(point.curveTo,frame)
      return newPoint
  }

  createPointTuples(points,frame,isClosed){
      let pointTuples = [];
      points.forEach((point,index)=>{
          //Edge case for non closed shapes
          if (index === points.length - 1 && !isClosed) {
              return;
          }

          let edge = {}
          edge.p1 = this.convertPoint(point, frame)

          //last point wraps around
          if (index === points.length - 1) {
              edge.p2 = this.convertPoint(points[0], frame);
          }

          else {
              edge.p2 = this.convertPoint(points[index + 1], frame)
          }

          pointTuples.push(edge);

      })
      return pointTuples;
  }

  createPathCode(data,frame){

      let path = '';
      let edges = this.createPointTuples(data.points, frame, data.isClosed);

      //loop through the edges
      edges.forEach((edge,i) => {
          //create a starting point
          if(i === 0){
              //add M
              path += this.createM(edge.p1.point);
          }

          //add a curve
          if(this.isCurve(edge)){
              let controlPoints = this.getControlPoints(edge);
              let endPoint = edge.p2.point

              path += this.createC(controlPoints[0], controlPoints[1], endPoint);
              //if the second point is a mirrored bezier curve
              //add an s-curve
              if(this.isSmoothCurve(edge)){
                  path += this.createS(controlPoints[1],endPoint);
              }
          }

          //add a line
          else if(this.isLine(edge)){
              path += this.createL(edge.p2.point);
          }

          //add a Z to close off
          if(i === edges.length - 1){
              path += this.createZ(this.class === 'shape' ? '' : ' ');
          }

      });
      console.log(path);
      return path;

  }

  extractPoints(point,frame){
      return point.replace(/[{}]/g, '').replace(/\s/g, '').split(',').map(parseFloat).map( (p,i)=> {
          if(i === 0) return parseFloat(parseFloat((p * frame.width) + frame.x).toFixed(4));
          if(i === 1) return parseFloat(parseFloat((p * frame.height) + frame.y).toFixed(4));
          return 0;
      });
  }

  isLine(edge){
      return !edge.p1.hasCurveFrom && !edge.p2.hasCurveTo
  }

  isCurve(edge){
      return edge.p1.hasCurveFrom || edge.p2.hasCurveTo
  }
  
  isSmoothCurve(edge){
      return edge.p2.curveMode === 2
  }

  getControlPoints(edge,frame){
      return [edge.p1.curveFrom,edge.p2.curveTo];
  }

  p2s(points){
      return `${points[0]} ${points[1]}`;
  }

  createM(points){
      return `M ${this.p2s(points)} `
  }

  createL(points){
      return `L ${this.p2s(points)} `
  }

  createC(curveFrom,curveTo,points){
      return `C ${this.p2s(curveFrom)} ${this.p2s(curveTo)} ${this.p2s(points)} `
  }

  createS(curveFrom,endPoint){
      return `S ${this.p2s(curveFrom)} ${this.p2s(endPoint)} `
  }

  createZ(suffix){
      return 'Z' + suffix
  }
}
