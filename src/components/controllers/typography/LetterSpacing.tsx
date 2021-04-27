import React, { useContext } from 'react'
import ControllersContext from '../ControllersContext'
import type { Property } from '../../../models/controlles/controlles'
import { useStoreActions, useStoreState } from '../../../reduxStore'
import SelectController from '../../SelectController'
import useComputeProperty from '../useComputeProperty'

const LetterSpacing: React.FC = (): JSX.Element => {
  const { already } = useContext(ControllersContext)

  const values = useStoreState<Array<string>>((state) => state.typography.letterSpacingValues)
  const propertys = useStoreState<Array<Property>>((state) => state.typography.letterSpacingPropertys)
  const property = useComputeProperty(propertys)

  if (already && !property) return <></>

  return <SelectController placeholder="letter-spacing" values={values} property={property} />
}

export default LetterSpacing
