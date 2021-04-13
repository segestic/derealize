import React, { useMemo, useState, useContext } from 'react'
import ControllersContext from '../ControllersContext'
import type { Property } from '../../../models/controlles/controlles'
import { useStoreActions, useStoreState } from '../../../reduxStore'
import SelectController from '../../SelectController'
import useComputeProperty from '../useComputeProperty'
import { ElementPayload } from '../../../backend/backend.interface'

const FlexGrow: React.FC = (): JSX.Element => {
  const { already } = useContext(ControllersContext)
  const element = useStoreState<ElementPayload | undefined>((state) => state.controlles.element)

  const flexGrowValues = useStoreState<Array<string>>((state) => state.layout.flexGrowValues)
  const propertys = useStoreState<Array<Property>>((state) => state.layout.flexGrowPropertys)
  const property = useComputeProperty(propertys)

  if (already && !property) return <></>
  if (!element || element.parentDisplay !== 'flex') return <></>

  return <SelectController placeholder="flex-grow" values={flexGrowValues} property={property} />
}

export default FlexGrow
