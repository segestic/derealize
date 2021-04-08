import { Action, action, Thunk, thunk, computed, Computed } from 'easy-peasy'
import type { StoreModel } from '../index'
import { Property, AlreadyVariants } from './controlles'

export const FlexDirectionValues = ['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse']
export const FlexWrapValues = ['flex-wrap', 'flex-wrap-reverse', 'flex-nowrap']
export const JustifyContentValues = [
  'justify-start',
  'justify-end',
  'justify-center',
  'justify-between',
  'justify-around',
  'justify-evenly',
]
export const AlignItemsValues = ['items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch']
export const AlignContentValues = [
  'content-center',
  'content-start',
  'content-end',
  'content-between',
  'content-around',
  'content-evenly',
]
export const AlignSelfValues = ['self-auto', 'self-start', 'self-end', 'self-center', 'self-stretch']

export interface FlexModel {
  flexDirectionPropertys: Computed<FlexModel, Array<Property>, StoreModel>

  flexWrapPropertys: Computed<FlexModel, Array<Property>, StoreModel>

  flexValues: Computed<FlexModel, Array<string>, StoreModel>
  flexPropertys: Computed<FlexModel, Array<Property>, StoreModel>

  flexGrowValues: Computed<FlexModel, Array<string>, StoreModel>
  flexGrowPropertys: Computed<FlexModel, Array<Property>, StoreModel>

  flexShrinkValues: Computed<FlexModel, Array<string>, StoreModel>
  flexShrinkPropertys: Computed<FlexModel, Array<Property>, StoreModel>

  orderValues: Computed<FlexModel, Array<string>, StoreModel>
  orderPropertys: Computed<FlexModel, Array<Property>, StoreModel>

  justifyContentPropertys: Computed<FlexModel, Array<Property>, StoreModel>
  alignItemsPropertys: Computed<FlexModel, Array<Property>, StoreModel>
  alignContentPropertys: Computed<FlexModel, Array<Property>, StoreModel>
  alignSelfPropertys: Computed<FlexModel, Array<Property>, StoreModel>

  allPropertys: Computed<FlexModel, Array<Property>, StoreModel>
  alreadyVariants: Computed<FlexModel, AlreadyVariants, StoreModel>
}

const flexModel: FlexModel = {
  flexDirectionPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => FlexDirectionValues.includes(classname)),
  ),

  flexWrapPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => FlexWrapValues.includes(classname)),
  ),

  flexValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.flex).map((v) => `flex-${v}`)
  }),
  flexPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.flexValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  flexGrowValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.flexGrow).map((v) =>
      v === 'DEFAULT' ? 'flex-grow' : `flex-grow-${v}`,
    )
  }),
  flexGrowPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.flexGrowValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  flexShrinkValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.flexShrink).map((v) =>
      v === 'DEFAULT' ? 'flex-shrink' : `flex-shrink-${v}`,
    )
  }),
  flexShrinkPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.flexShrinkValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  orderValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.order).map((v) => `order-${v}`)
  }),
  orderPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.orderValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  justifyContentPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => JustifyContentValues.includes(classname)),
  ),
  alignItemsPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => AlignItemsValues.includes(classname)),
  ),
  alignContentPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => AlignContentValues.includes(classname)),
  ),
  alignSelfPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => AlignSelfValues.includes(classname)),
  ),

  allPropertys: computed(
    ({
      flexDirectionPropertys,
      flexWrapPropertys,
      flexPropertys,
      flexGrowPropertys,
      flexShrinkPropertys,
      orderPropertys,
      justifyContentPropertys,
      alignItemsPropertys,
      alignContentPropertys,
      alignSelfPropertys,
    }) => {
      return flexDirectionPropertys.concat(
        flexWrapPropertys,
        flexPropertys,
        flexGrowPropertys,
        flexShrinkPropertys,
        orderPropertys,
        justifyContentPropertys,
        alignItemsPropertys,
        alignContentPropertys,
        alignSelfPropertys,
      )
    },
  ),

  alreadyVariants: computed(({ allPropertys }) => {
    const screens = allPropertys.filter((property) => property.screen).map((property) => property.screen as string)
    const states = allPropertys.filter((property) => property.state).map((property) => property.state as string)
    const lists = allPropertys.filter((property) => property.list).map((property) => property.list as string)
    const customs = allPropertys.filter((property) => property.custom).map((property) => property.custom as string)
    return {
      screens: [...new Set(screens)],
      states: [...new Set(states)],
      lists: [...new Set(lists)],
      customs: [...new Set(customs)],
      dark: allPropertys.some((property) => property.dark),
    }
  }),
}

export default flexModel
