import React from 'react'

const generateStories = (
  stories: any,
  names: string[],
  Component: React.Component,
  propName: string,
  props: any = {},
) => {
  names.forEach((name: string) => {
    stories.add(name, () => <Component {...{ [propName]: name, ...props }} />)
  })
  return stories
}

export default generateStories
