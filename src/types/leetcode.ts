export interface Solution {
  language: string
  code: string
}

export interface ResponseData {
  problemNumber: string
  title: string
  story: string
  problemStatement: string
  hints: string[]
  solution: Solution[] | Solution | string
}