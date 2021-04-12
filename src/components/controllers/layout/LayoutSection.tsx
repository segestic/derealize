import React, { useState, useContext } from 'react'
import { VStack, Stack, RadioGroup, Radio } from '@chakra-ui/react'
import { StringOrNumber } from '@chakra-ui/utils'
import cs from 'classnames'
import { css } from '@emotion/react'
import type { AlreadyVariants } from '../../../models/controlles/controlles'
import { useStoreActions, useStoreState } from '../../../reduxStore'
import ControllersContext from '../../ControllersContext'

import Variants from '../Variants'
import Container from './Container'
import Display from './Display'
import ObjectFit from './ObjectFit'
import ObjectPosition from './ObjectPosition'
import Overflow from './Overflow'
import Position from './Position'
import Visibility from './Visibility'
import Zindex from './Zindex'

import FlexController from '../flex/Flex'
import FlexDirection from '../flex/FlexDirection'
import FlexGrow from '../flex/FlexGrow'
import FlexShrink from '../flex/FlexShrink'
import FlexWrap from '../flex/FlexWrap'
import JustifyContent from '../flex/JustifyContent'
import Order from '../flex/Order'
import AlignContent from '../flex/AlignContent'
import AlignItems from '../flex/AlignItems'
import AlignSelf from '../flex/AlignSelf'

import GridCols from '../grid/GridCols'
import GridRows from '../grid/GridRows'

enum LayoutMode {
  Flex = 'flex',
  Grid = 'grid',
}

const LayoutSection: React.FC = (): JSX.Element => {
  const { already } = useContext(ControllersContext)
  const alreadyVariants = useStoreState<AlreadyVariants>((state) => state.layout.alreadyVariants)
  const [layoutMode, setLayoutMode] = React.useState<StringOrNumber>(LayoutMode.Flex)

  return (
    <VStack alignItems="flex-start">
      {!already && <Variants alreadyVariants={alreadyVariants} />}
      <Container />
      <Display />
      <ObjectFit />
      <ObjectPosition />
      <Overflow />
      <Position />
      <Visibility />
      <Zindex />

      <RadioGroup onChange={(v) => setLayoutMode(v)} value={layoutMode}>
        <Stack direction="row">
          <Radio value={LayoutMode.Flex}>Flex</Radio>
          <Radio value={LayoutMode.Grid}>Grid</Radio>
        </Stack>
      </RadioGroup>

      {layoutMode === LayoutMode.Flex && (
        <>
          <FlexController />
          <FlexDirection />
          <FlexGrow />
          <FlexShrink />
          <FlexWrap />
          <JustifyContent />
          <Order />
          <AlignContent />
          <AlignItems />
          <AlignSelf />
        </>
      )}

      {layoutMode === LayoutMode.Grid && (
        <>
          <GridCols />
          <GridRows />
        </>
      )}
    </VStack>
  )
}

LayoutSection.defaultProps = {
  already: false,
}

export default LayoutSection
