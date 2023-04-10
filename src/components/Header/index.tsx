import type { Component } from 'solid-js';
import { splitProps } from "solid-js";
import { 
    Box, 
    Heading,
    Flex, 
    Spacer, 
    Button, 
    IconButton 
} from '@hope-ui/solid';
import { IoMenuOutline, IoAdd, IoPlayOutline } from "solid-icons/io";

import styles from "./style.module.css";
import { useStore } from '../../store';

interface HeaderProps {
    onShowOptions?: () => void
    onAddPoint?: () => void
    onClear?: () => void
    onClickProceed?: () => void
    isAddingPoint?: boolean
}

const Header: Component<HeaderProps> = (props) => {
    const { points } = useStore();
    const [local, others] = splitProps(props, ["onShowOptions", "onAddPoint", "isAddingPoint", "onClear", "onClickProceed"]);
    return <Flex class={styles.Options}>
        <Box>
            <IconButton
                size="sm"
                aria-label="Drawer"
                icon={<IoMenuOutline />}
                onClick={() => {if (local.onShowOptions) local.onShowOptions()}}
            />
        </Box>
        <Spacer />
        {/* <Box>
            <Button
                size="sm"
                mr="$2"
                onClick={() => { if (local.onClear) local.onClear(); }}
            >
                Очистить
            </Button>
        </Box> */}
        <Box>
            <Button 
                size="sm" 
                disabled={!(points.length > 1)}
                // variant={local.isAddingPoint ? "solid" : "subtle"}
                onClick={() => { if (local.onClickProceed) local.onClickProceed(); }}
            > 
                <Heading> Запуск </Heading> <IoPlayOutline style={{ "margin-left": "5" }}/> 
            </Button>
        </Box>
    </Flex>
}

export default Header;