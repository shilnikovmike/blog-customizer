import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SetStateAction, Dispatch, useState, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

export type TArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: Dispatch<SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const { articleState, setArticleState } = props;

	const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(articleState);

	const asideRef = useRef<HTMLDivElement>(null);
	const initialState = useRef<ArticleStateType>(articleState);

	useOutsideClickClose({
		isOpen: sidebarOpened,
		rootRef: asideRef,
		onChange: setSidebarOpened,
	});

	function closeSidebar() {
		setSidebarOpened(false);
	}

	function openSidebar() {
		setSidebarOpened(true);
	}

	function toggleSidebar() {
		if (sidebarOpened) {
			closeSidebar();
		} else {
			openSidebar();
		}
	}

	function handleChange(key: keyof ArticleStateType, value: OptionType) {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	}

	function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		setArticleState({ ...selectArticleState });
	}

	function handleReset() {
		setArticleState({ ...initialState.current });
		setSelectArticleState({ ...initialState.current });
	}

	return (
		<>
			<ArrowButton
				isOpen={sidebarOpened}
				onClick={() => {
					toggleSidebar();
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: sidebarOpened,
				})}
				ref={asideRef}>
				<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={selectArticleState.fontFamilyOption.title}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						name={'font-size'}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>
					<Select
						title='Цивет Шрифта'
						selected={selectArticleState.fontColor}
						options={fontColors}
						placeholder={selectArticleState.fontColor.title}
						onChange={(option) => handleChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет Фона'
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						placeholder={selectArticleState.backgroundColor.title}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>
					<Select
						title='Ширина Контента'
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						placeholder={selectArticleState.contentWidth.title}
						onChange={(option) => handleChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => handleReset()}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
