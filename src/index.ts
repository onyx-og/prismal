// [TODO] Avoid using aliases here.

import Icon from "./components/Icon";
import Button from "./components/Button";
import ButtonGroup from "components/ButtonGroup";
import Select, { SelectOption } from "./components/Form/Select";
import TextInput from "./components/Form/TextInput";
import Toggle from "./components/Form/Toggle";
import Dropdown from "./components/Dropdown";
import Tooltip from "./components/Tooltip";
import List from "./components/List";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import ActionBar from "./components/ActionBar";
import type {ActionBarItemConfig} from "./components/ActionBar/types";
import Alert from "./components/Alert";
import { setAccentStyle, hex2rgba } from "./utils/colors";
import Card, {CardProps} from "./components/Card";
import Slider from "components/Slider";
import Header from "components/Header";
import Table from "components/Table";
import Form from "components/Form";
import LazyItem from "components/LazyItem";

import useModal from "./hooks/useModal";
import useSidebar from "./hooks/useSidebar";
import useElementHeight from "./hooks/useElementHeight";
import useElementWidth from "./hooks/useElementWidth";
import { useElScrollThreshold, useElScrollPosition, useScrollThreshold} from "hooks/useScrollPosition";
import {useIntersectionObserver} from "hooks/";

export type { SelectOption };
export { ActionBar };
export type { ActionBarItemConfig };
export type { CardProps };
export { ButtonGroup, Button };
export { Slider };
export { Header };
export { Table };
export {Icon, Card, List, Modal, Alert, SearchBar, Sidebar};
export { Form, Select, TextInput, Toggle };
export { Dropdown, Tooltip };
export { LazyItem };
export { setAccentStyle, hex2rgba };
export { useModal, useSidebar };
export { useElementHeight, useElementWidth} 
export { useElScrollThreshold, useElScrollPosition, useIntersectionObserver, useScrollThreshold };