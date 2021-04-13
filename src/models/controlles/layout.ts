import { computed, Computed } from 'easy-peasy'
import type { StoreModel } from '../index'
import { Property, AlreadyVariants } from './controlles'

export const ContainerValue = 'container'
export const DisplayValues = [
  'block',
  'inline-block',
  'inline',
  'flex',
  'inline-flex',
  'table',
  'inline-table',
  'table-caption',
  'table-cell',
  'table-column',
  'table-column-group',
  'table-footer-group',
  'table-header-group',
  'table-row-group',
  'table-row',
  'flow-root',
  'grid',
  'inline-grid',
  'contents',
  'list-item',
  'hidden',
]
export const ObjectFitValues = ['object-contain', 'object-cover', 'object-fill', 'object-none', 'object-scale-down']
export const OverflowValues = [
  'overflow-auto',
  'overflow-hidden',
  'overflow-visible',
  'overflow-scroll',
  'overflow-x-auto',
  'overflow-x-hidden',
  'overflow-x-visible',
  'overflow-x-scroll',
  'overflow-y-auto',
  'overflow-y-hidden',
  'overflow-y-visible',
  'overflow-y-scroll',
]

export const PositionValues = ['static', 'fixed', 'absolute', 'relative', 'sticky']
export const VisibilityValues = ['visible', 'invisible']

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

export const GridFlowValues = ['grid-flow-row', 'grid-flow-col', 'grid-flow-row-dense', 'grid-flow-col-dense']

export interface LayoutModel {
  // #region layout
  containerPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  displayPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  objectFitPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  objectPositionValues: Computed<LayoutModel, Array<string>, StoreModel>
  objectPositionPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  overflowPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  positionPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  insetSuffix: Computed<LayoutModel, Array<string>, StoreModel>
  insetValues: Computed<LayoutModel, Array<string>, StoreModel>
  insetPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  insetYValues: Computed<LayoutModel, Array<string>, StoreModel>
  insetYPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  insetXValues: Computed<LayoutModel, Array<string>, StoreModel>
  insetXPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  topValues: Computed<LayoutModel, Array<string>, StoreModel>
  topPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  bottomValues: Computed<LayoutModel, Array<string>, StoreModel>
  bottomPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  rightValues: Computed<LayoutModel, Array<string>, StoreModel>
  rightPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  leftValues: Computed<LayoutModel, Array<string>, StoreModel>
  leftPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  visibilityPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  zIndexValues: Computed<LayoutModel, Array<string>, StoreModel>
  zIndexPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  // #endregion

  // #region flex
  flexDirectionPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  flexWrapPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  flexValues: Computed<LayoutModel, Array<string>, StoreModel>
  flexPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  flexGrowValues: Computed<LayoutModel, Array<string>, StoreModel>
  flexGrowPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  flexShrinkValues: Computed<LayoutModel, Array<string>, StoreModel>
  flexShrinkPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  orderValues: Computed<LayoutModel, Array<string>, StoreModel>
  orderPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  justifyContentPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  alignItemsPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  alignContentPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  alignSelfPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  // #endregion

  // #region grid
  gridColsValues: Computed<LayoutModel, Array<string>, StoreModel>
  gridColsPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  gridRowsValues: Computed<LayoutModel, Array<string>, StoreModel>
  gridRowsPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  colSpanValues: Computed<LayoutModel, Array<string>, StoreModel>
  colSpanPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  colStartValues: Computed<LayoutModel, Array<string>, StoreModel>
  colStartPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  colEndValues: Computed<LayoutModel, Array<string>, StoreModel>
  colEndPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  rowSpanValues: Computed<LayoutModel, Array<string>, StoreModel>
  rowSpanPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  rowStartValues: Computed<LayoutModel, Array<string>, StoreModel>
  rowStartPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  rowEndValues: Computed<LayoutModel, Array<string>, StoreModel>
  rowEndPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  gridFlowPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  gapValues: Computed<LayoutModel, Array<string>, StoreModel>
  gapPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  autoColsValues: Computed<LayoutModel, Array<string>, StoreModel>
  autoColsPropertys: Computed<LayoutModel, Array<Property>, StoreModel>

  autoRowsValues: Computed<LayoutModel, Array<string>, StoreModel>
  autoRowsPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  // #endregion

  allPropertys: Computed<LayoutModel, Array<Property>, StoreModel>
  alreadyVariants: Computed<LayoutModel, AlreadyVariants, StoreModel>
}

const layoutModel: LayoutModel = {
  // #region layout
  containerPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter((property) => property.classname === ContainerValue),
  ),

  displayPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => DisplayValues.includes(classname)),
  ),

  objectFitPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => ObjectFitValues.includes(classname)),
  ),

  objectPositionValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.objectPosition).map((v) => `object-${v}`)
  }),
  objectPositionPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.objectPositionValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  overflowPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => OverflowValues.includes(classname)),
  ),

  positionPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => PositionValues.includes(classname)),
  ),

  insetSuffix: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.inset)
  }),
  insetValues: computed(({ insetSuffix }) => {
    return insetSuffix.map((v) => `inset-${v}`).concat(insetSuffix.map((v) => `-inset-${v}`))
  }),
  insetPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.insetValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),
  insetYValues: computed(({ insetSuffix }) => {
    return insetSuffix.map((v) => `inset-y-${v}`).concat(insetSuffix.map((v) => `-inset-y-${v}`))
  }),
  insetYPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.insetYValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),
  insetXValues: computed(({ insetSuffix }) => {
    return insetSuffix.map((v) => `inset-x-${v}`).concat(insetSuffix.map((v) => `-inset-x-${v}`))
  }),
  insetXPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.insetXValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),
  topValues: computed(({ insetSuffix }) => {
    return insetSuffix.map((v) => `top-${v}`).concat(insetSuffix.map((v) => `-top-${v}`))
  }),
  topPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.topValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),
  bottomValues: computed(({ insetSuffix }) => {
    return insetSuffix.map((v) => `bottom-${v}`).concat(insetSuffix.map((v) => `-bottom-${v}`))
  }),
  bottomPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.bottomValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),
  rightValues: computed(({ insetSuffix }) => {
    return insetSuffix.map((v) => `right-${v}`).concat(insetSuffix.map((v) => `-right-${v}`))
  }),
  rightPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.rightValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),
  leftValues: computed(({ insetSuffix }) => {
    return insetSuffix.map((v) => `left-${v}`).concat(insetSuffix.map((v) => `-left-${v}`))
  }),
  leftPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.leftValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  visibilityPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => VisibilityValues.includes(classname)),
  ),

  zIndexValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.zIndex).map((v) => `z-${v}`)
  }),
  zIndexPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.zIndexValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),
  // #endregion

  // #region flex
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
  // #endregion

  // #region grid
  gridColsValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridTemplateColumns).map((v) => `grid-cols-${v}`)
  }),
  gridColsPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.gridColsValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  gridRowsValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridTemplateRows).map((v) => `grid-rows-${v}`)
  }),
  gridRowsPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.gridColsValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  colSpanValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridColumn).map((v) => `col-span-${v}`)
  }),
  colSpanPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.colSpanValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  colStartValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridColumnStart).map((v) => `col-start-${v}`)
  }),
  colStartPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.colStartValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  colEndValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridColumnEnd).map((v) => `col-end-${v}`)
  }),
  colEndPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.colStartValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  rowSpanValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridRow).map((v) => `row-span-${v}`)
  }),
  rowSpanPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.rowSpanValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  rowStartValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridRowStart).map((v) => `row-start-${v}`)
  }),
  rowStartPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.rowStartValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  rowEndValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridRowEnd).map((v) => `row-end-${v}`)
  }),
  rowEndPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.rowEndValues],
    (propertys, vlaues) => propertys.filter(({ classname }) => vlaues.includes(classname)),
  ),

  gridFlowPropertys: computed([(state, storeState) => storeState.controlles.propertys], (propertys) =>
    propertys.filter(({ classname }) => GridFlowValues.includes(classname)),
  ),

  gapValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    const { spacing, gap } = project.tailwindConfig.theme
    return Object.keys(Object.assign(gap, spacing)).map((v) => `gap-${v}`)
  }),
  gapPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.gapValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  autoColsValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridAutoColumns).map((v) => `auto-cols-${v}`)
  }),
  autoColsPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.autoColsValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),

  autoRowsValues: computed([(state, storeState) => storeState.project.frontProject], (project) => {
    if (!project?.tailwindConfig) return []
    return Object.keys(project.tailwindConfig.theme.gridAutoRows).map((v) => `auto-rows-${v}`)
  }),
  autoRowsPropertys: computed(
    [(state, storeState) => storeState.controlles.propertys, (state) => state.autoRowsValues],
    (propertys, values) => propertys.filter(({ classname }) => values.includes(classname)),
  ),
  // #endregion

  allPropertys: computed(
    ({
      containerPropertys,
      displayPropertys,
      objectFitPropertys,
      objectPositionPropertys,
      overflowPropertys,
      positionPropertys,
      insetPropertys,
      insetYPropertys,
      insetXPropertys,
      topPropertys,
      bottomPropertys,
      leftPropertys,
      rightPropertys,
      visibilityPropertys,
      zIndexPropertys,

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

      gridColsPropertys,
      gridRowsPropertys,
      colSpanPropertys,
      colStartPropertys,
      colEndPropertys,
      rowSpanPropertys,
      rowStartPropertys,
      rowEndPropertys,
      gridFlowPropertys,
      gapPropertys,
      autoColsPropertys,
      autoRowsPropertys,
    }) => {
      return containerPropertys.concat(
        displayPropertys,
        objectFitPropertys,
        objectPositionPropertys,
        overflowPropertys,
        positionPropertys,
        insetPropertys,
        insetYPropertys,
        insetXPropertys,
        topPropertys,
        bottomPropertys,
        leftPropertys,
        rightPropertys,
        visibilityPropertys,
        zIndexPropertys,

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

        gridColsPropertys,
        gridRowsPropertys,
        colSpanPropertys,
        colStartPropertys,
        colEndPropertys,
        rowSpanPropertys,
        rowStartPropertys,
        rowEndPropertys,
        gridFlowPropertys,
        gapPropertys,
        autoColsPropertys,
        autoRowsPropertys,
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

export default layoutModel
