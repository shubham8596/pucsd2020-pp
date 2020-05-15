import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Folder1',
    children: [
      {name: 'f1.txt'},
      {name: 'f2.txt'},
      {name: 'f3.txt'},
    ]
  }, {
    name: 'Folder2',
    children: [
      {
        name: 'Folder2.1',
        children: [
          {name: 'f1.txt'},
          {name: 'f2.txt'},
        ]
      }, {
        name: 'Folder2.2',
        children: [
          {name: 'f3.txt'},
          {name: 'f4.txt'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

   private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  constructor() {
  this.dataSource.data = TREE_DATA; }

  ngOnInit(): void {
  }

}
