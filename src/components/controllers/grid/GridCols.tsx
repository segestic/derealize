import React, { useMemo, useState, useContext } from 'react'
import cs from 'classnames'
import ControllersContext from '../ControllersContext'
import type { Property } from '../../../models/controlles/controlles'
import SelectController from '../../SelectController'
import { useStoreActions, useStoreState } from '../../../reduxStore'
import useComputeProperty from '../useComputeProperty'
import { ElementState } from '../../../models/element'

const GridCols: React.FC = (): JSX.Element => {
  const { already } = useContext(ControllersContext)
  const element = useStoreState<ElementState | undefined>((state) => state.element.activeElement)

  const values = useStoreState<Array<string>>((state) => state.layout.gridColsValues)
  const propertys = useStoreState<Array<Property>>((state) => state.layout.gridColsPropertys)
  const property = useComputeProperty(propertys)

  if (already && !property) return <></>
  if (!element?.actualStatus?.display.includes('grid')) return <></>

  return <SelectController placeholder="grid-cols" values={values} property={property} />
}

export default GridCols
