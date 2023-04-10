import { Component, createSignal, splitProps } from "solid-js";

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    VStack
} from "@hope-ui/solid";

interface ModalCreateProps {
    isOpen: boolean
    onClose?: (data: any) => void
    onSubmit?: (data: any) => void
}

const ModalCreate: Component<ModalCreateProps> = (props) => {
    const [local, others] = splitProps(props, ["isOpen", "onClose", "onSubmit"]);
    const [name, setName] = createSignal("");
    const [time, setTime] = createSignal(0);

    const handleChangeName = (e: any) => {
        console.log({e})
        setName(e.target.value);
    }

    const handleChangeTime = (e: any) => {
        if (e.target.value.length > 0) {
            setTime(parseInt(e.target.value));
        } else setTime(0);
    }

    const handleSubmit = () => {
        const newName = name().length > 0 ? name() : "Моя точка";
        const newTime = time() > 0 ? time() : 30;
        if (local.onSubmit) local.onSubmit({
            name: newName,
            time: newTime
        });
    }

    return <Modal
        motionPreset="fade-in-bottom" 
        centered
        opened={local.isOpen}
        onClose={() => { if (local.onClose) local.onClose({}); }}
    >
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton />
            <ModalHeader> Добавление новой точки </ModalHeader>
            <ModalBody>
                <VStack
                    as="form" 
                    // ref={form} 
                    spacing="$5" 
                    alignItems="stretch" 
                >
                    <FormControl>
                        <FormLabel> Название: </FormLabel>
                        <Input type="text" name="name" variant="filled" placeholder="Моя точка" value={name()} onChange={(e) => handleChangeName(e) } />
                    </FormControl>
                    <FormControl>
                        <FormLabel> Время подготовки: </FormLabel>
                        <Input type="text" name="time" variant="filled" pattern="[0-9]*" placeholder="30 минут" value={time() > 0 ? time() : ""} onChange={(e) => handleChangeTime(e) } />
                        <FormHelperText> Время указывается в минутах. </FormHelperText>
                    </FormControl>
                </VStack>
            </ModalBody>
            <ModalFooter>
                <Button 
                    width="100%"
                    onClick={() => handleSubmit() }
                > Добавить </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
};

export default ModalCreate;