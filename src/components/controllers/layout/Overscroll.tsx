import React, { useMemo, useState, useEffect } from 'react'
import groupBy from 'lodash.groupBy'
import { Box, Text } from '@chakra-ui/react'
import Select from 'react-select'
import cs from 'classnames'
import { nanoid } from 'nanoid'
import { css } from '@emotion/react'
import type { Property } from '../../../models/controlles'
import { OverscrollValues } from '../../../models/controlles/layout'
import SelectController, { OptionType } from '../../SelectController'
import { useStoreActions, useStoreState } from '../../../reduxStore'

const OverscrollGroups = groupBy<string>(OverscrollValues, (value) => value.split('-').splice(-1).join('-'))

const OverscrollOptions = Object.entries(OverscrollGroups).map(([label, values]) => ({
  label,
  options: values.map((value) => ({ value, label: value })),
}))

type Props = {
  already: boolean
}

const Overscroll: React.FC<Props> = ({ already }: Props): JSX.Element => {
  const setProperty = useStoreActions((actions) => actions.controlles.setProperty)
  const deleteProperty = useStoreActions((actions) => actions.controlles.deleteProperty)

  const selectScreenVariant = useStoreState<string | undefined>((state) => state.controlles.selectScreenVariant)
  const selectStateVariant = useStoreState<string | undefined>((state) => state.controlles.selectStateVariant)
  const selectListVariant = useStoreState<string | undefined>((state) => state.controlles.selectListVariant)
  const selectCustomVariant = useStoreState<string | undefined>((state) => state.controlles.selectCustomVariant)

  const propertys = useStoreState<Array<Property>>((state) => state.layout.floatPropertys)
  const property = useMemo<Property | undefined>(
    () =>
      propertys.find(
        (p) =>
          p.screen === selectScreenVariant &&
          p.state === selectStateVariant &&
          p.list === selectListVariant &&
          p.custom === selectCustomVariant,
      ),
    [propertys, selectScreenVariant, selectStateVariant, selectListVariant, selectCustomVariant],
  )

  const value = useMemo<OptionType | null>(
    () => (property ? { value: property.classname, label: property.classname } : null),
    [property],
  )

  if (already && !property) return <></>

  return (
    <SelectController
      placeholder="Overscroll"
      options={OverscrollOptions}
      value={value}
      onChange={(cvalue, { action }) => {
        if (action === 'clear' && property) {
          deleteProperty(property.id)
        } else if (action === 'select-option' && cvalue) {
          if (property) {
            property.classname = cvalue.value
            setProperty(property)
          } else {
            setProperty({
              id: nanoid(),
              classname: cvalue.value,
            } as Property)
          }
        }
      }}
    />
  )
}

export default Overscroll
