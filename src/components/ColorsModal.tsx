/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react'
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Box,
  VStack,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { Handler, TailwindConfigReply } from '../backend/backend.interface'
import { useStoreActions, useStoreState } from '../reduxStore'
import type { Project, Colors } from '../models/project.interface'
import style from './ColorsModal.module.scss'
import type { PreloadWindow } from '../preload'
import type { ThemeColorPayload } from '../interface'

declare const window: PreloadWindow
const { sendBackIpc } = window.derealize

const ColorsModal = (): JSX.Element => {
  const toast = useToast()

  const project = useStoreState<Project | undefined>((state) => state.project.frontProject)
  const colorsModalDisclosure = useStoreState<Colors | undefined>((state) => state.project.colorsModalDisclosure)
  const toggleModal = useStoreActions((actions) => actions.project.toggleColorsModal)
  const setTailwindConfig = useStoreActions((actions) => actions.project.setTailwindConfig)
  const [editing, setEditing] = useState(false)

  const colors = colorsModalDisclosure || project?.tailwindConfig?.theme.colors

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ key: string; value: string }>()

  const onDelete = handleSubmit(async (data) => {
    if (!window.confirm('Sure Delete?')) return

    if (!project) return
    const { key } = data

    const payload: ThemeColorPayload = { projectId: project.id, key, value: '' }
    const reply = (await sendBackIpc(Handler.ThemeRemoveColor, payload as any)) as TailwindConfigReply
    if (reply.error) {
      toast({
        title: `delete color error: ${reply.error}`,
        status: 'error',
      })
      return
    }

    if (reply.result) {
      setTailwindConfig({ projectId: project.id, config: reply.result })
    }
  })

  const onSet = handleSubmit(async (data) => {
    if (!project) return

    const { key, value } = data
    const payload: ThemeColorPayload = {
      projectId: project.id,
      key,
      value,
    }

    const reply = (await sendBackIpc(Handler.ThemeSetColor, payload as any)) as TailwindConfigReply
    if (reply.error) {
      toast({
        title: `add color error: ${reply.error}`,
        status: 'error',
      })
      return
    }

    if (reply.result) {
      reset({ key: '', value: '' })
      setTailwindConfig({ projectId: project.id, config: reply.result })
    }
  })

  return (
    <>
      <Modal isOpen={!!colors} onClose={() => toggleModal(undefined)} scrollBehavior="outside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Colors</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!!colors &&
              Object.entries(colors).map(([group, values]) => (
                <Box key={group}>
                  <Text>{group}</Text>
                  <div className={style.colorList}>
                    {typeof values === 'string' && (
                      <div
                        style={{ backgroundColor: values }}
                        onClick={() => {
                          reset({ key: group, value: values })
                          setEditing(true)
                        }}
                        role="button"
                        aria-hidden="true"
                      />
                    )}
                    {typeof values !== 'string' &&
                      Object.entries(values).map(([prefix, value]) => (
                        <div
                          key={prefix}
                          style={{ backgroundColor: value as string }}
                          onClick={() => {
                            reset({ key: `${group}/${prefix}`, value: value as string })
                            setEditing(true)
                          }}
                          role="button"
                          aria-hidden="true"
                        />
                      ))}
                  </div>
                </Box>
              ))}
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="gray" variant="outline" onClick={() => toggleModal(undefined)}>
              Close
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => {
                reset({ key: '', value: '' })
                setEditing(true)
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={!!editing} onClose={() => setEditing(false)} size="xl">
        <ModalContent>
          <ModalHeader textAlign="center">Set Color</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="stretch">
              <FormControl isInvalid={!!errors.key} isRequired>
                <Input {...register('key', { required: true })} type="text" placeholder="color key name" />
                <FormErrorMessage>{errors.key?.message}</FormErrorMessage>
                <Text>Use a slash &apos;/&apos; to group colors, for example: blue/500</Text>
              </FormControl>

              <FormControl isInvalid={!!errors.key} isRequired>
                <Input {...register('value', { required: true })} type="text" placeholder="eg: #ffffff" />
                <FormErrorMessage>{errors.value?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="teal" size="lg" variant="ghost" type="submit" onClick={onDelete}>
              Delete
            </Button>
            <Button colorScheme="teal" size="lg" type="submit" onClick={onSet}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ColorsModal
