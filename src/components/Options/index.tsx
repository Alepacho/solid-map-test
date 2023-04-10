import type { Component } from "solid-js";
import { splitProps, For } from "solid-js";
import { IoTrashBin, IoAdd } from "solid-icons/io";
import {
	Box, Text,
	Heading,
	Center,
	Button,
	Accordion,
	AccordionItem,
	AccordionIcon,
	AccordionButton,
	AccordionPanel,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Table,
	Tbody,
	Tr, Td,
	IconButton,
	FormControl,
	FormLabel,
	Input,
	Divider
} from "@hope-ui/solid";

import { Point } from "../../types/Point";
import { OptionClickType } from "./types";
import { useStore } from "../../store";

interface OptionsProps {
	opened: boolean
	onClose?: () => void
	onClick?: (type: OptionClickType) => void
}

const Options: Component<OptionsProps> = (props) => {
	const { points, setSpeed } = useStore();
	const store = useStore();

	const [local, others] = splitProps(props, ["opened", "onClose", "onClick"]);

	const handleClickDelete = (e: any) => {
		e.preventDefault();
	}

	const handleChangeSpeed = (e: any) => {
		// if (e.target.value.length > 0) {
			setSpeed(parseInt(e.target.value));
			// }
		console.log(store.speed)
	}

	return <Drawer
		opened={local.opened}
		placement="left"
		onClose={() => { if (local.onClose) local.onClose(); }}
		{...others}
	>
		<DrawerOverlay />
		<DrawerContent>
			<DrawerCloseButton />
			<DrawerHeader> Настройки точек </DrawerHeader>

			<DrawerBody>
				<Box mb="$3">
					<FormControl>
						<FormLabel> Скорость передвижения: </FormLabel>
						<Input type="text" name="speed" variant="filled" placeholder="4 км" value={store.speed} onChange={(e) => handleChangeSpeed(e) } />
					</FormControl>
				</Box>
				<Divider orientation="horizontal" mt="$3" mb="$3"/>
				<Button w="100%" onClick={() => { if (local.onClick) local.onClick(OptionClickType.ADD_POINT)}}> <Heading> Добавить точку </Heading> <IoAdd style={{ "margin-left": "5px" }}/> </Button>
				<Heading size="lg" m="$1" pt="$1"> Список точек: </Heading>
				<Accordion allowMultiple>
					<For fallback={<Center> <Text size="xs" color="$neutral11"> Нет данных </Text> </Center>} each={points}>{(p, i) => <AccordionItem>
							<h2>
							<AccordionButton>
								<Heading flex={1} noOfLines={1} textAlign="start">
									{i() + 1}. {p.name}
								</Heading>
								<IconButton 
									aria-label="Delete" 
									size="xs" mr="$2" 
									variant="ghost" 
									colorScheme="danger" 
									icon={<IoTrashBin/>} 
									onClick={(e: any) => handleClickDelete(e)}
								/>
								<AccordionIcon />
							</AccordionButton>
							</h2>
							<AccordionPanel style={{ "padding": 0 }}>
								<Table dense>
									<Tbody>
										<Tr>
											<Td>
												<Text fontWeight="$bold"> Время: </Text>
											</Td>
											<Td numeric>
												{p.time} минут(а)
											</Td>
										</Tr>
										{/* Longitude */}
										<Tr>
											<Td>
												<Text fontWeight="$bold"> Долгота: </Text>	
											</Td>
											<Td numeric>
												{p.lng}
											</Td>
										</Tr>
										{/* Latitude */}
										<Tr>
											<Td>
												<Text fontWeight="$bold"> Широта: </Text>	
											</Td>
											<Td numeric>
												{p.lat}
											</Td>
										</Tr>
									</Tbody>
								</Table>
								
							</AccordionPanel>
						</AccordionItem>
					}</For>
				</Accordion>
				
			</DrawerBody>

			{/* <DrawerFooter>
            footer
          </DrawerFooter> */}
		</DrawerContent>
	</Drawer>
}

export default Options;