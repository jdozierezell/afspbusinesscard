/** @jsx jsx */
/** @jsxFrag React.Fragment */
// eslint-disable-next-line
import React, { useState } from 'react'
import { jsx, css } from '@emotion/core'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import Toggle from 'react-toggle'

import affiliations from '../utils/affiliations'
import chapters from '../utils/chapters'
import states from '../utils/states'

import 'react-toggle/style.css'

const formCSS = css`
	label,
	input {
		display: block;
		width: 100%;
		font-family: 'AvenirNextLTPro-Regular';
		font-size: 16px;
	}
	label,
	.react-toggle {
		margin: 24px 0 6px;
	}
	label[for='showAddress'] {
		display: inline;
		padding-left: 24px;
		vertical-align: 12px;
	}
	label:first-of-type {
		margin-top: 0;
	}
	input {
		border-radius: 5px;
		border: 1px solid #262626;
		min-height: 34.3px;
	}
	> input {
		line-height: 1rem;
	}
	#urlWrapper {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		input {
			text-align: left;
		}
		span {
			vertical-align: center;
			padding-right: 0.5rem;
			font-family: 'AvenirNextLTPro-Demi';
		}
	}
	> .react-select__control {
		border: 1px solid #262626;
		border-radius: 5px;
		width: 100.5%;
	}
	> .react-select__control > .react-select__control {
		border: none;
	}
	.react-select__placeholder,
	.react-select__menu,
	.react-select__single-value {
		font-family: 'AvenirNextLTPro-Regular';
		font-size: 16px;
	}
	input[type='submit'] {
		margin-top: 48px;
		cursor: pointer;
	}
	#showSocialLabel {
		display: inline-block;
		width: initial;
		margin: 24px 0 0 24px;
		vertical-align: top;
		line-height: 24px;
	}
`

const BusinessForm = ({ data, createPDF, onInputChange, onSelectChange }) => {
	const { handleSubmit, control, register } = useForm()
	const [showAddress, setShowAddress] = useState(false)

	const submitForm = () => {
		createPDF()
	}

	return (
		<form css={formCSS} onSubmit={handleSubmit(submitForm)}>
			<label htmlFor="name">Name</label>
			<input
				ref={register}
				type="text"
				name="name"
				id="name"
				onChange={onInputChange}
			/>
			<label htmlFor="title">Title</label>
			<input
				ref={register}
				type="text"
				name="title"
				id="title"
				onChange={onInputChange}
			/>
			<label htmlFor="email">Email</label>
			<input
				ref={register}
				type="email"
				name="email"
				id="email"
				onChange={onInputChange}
			/>
			<label htmlFor="phone">Phone Number</label>
			<input
				ref={register}
				type="text"
				name="phone"
				id="phone"
				onChange={onInputChange}
			/>
			<label id="affiliation" htmlFor="affiliation">
				Choose Your Affiliation
			</label>
			<Controller
				as={Select}
				className="react-select__control"
				classNamePrefix="react-select"
				name="affiliation"
				control={control}
				options={affiliations}
				value={data.affiliation}
				onChange={data => {
					onSelectChange(data)
				}}
			/>
			{(data.affiliation === 'Chapter' ||
				data.affiliation === 'Out of the Darkness Campus Walk' ||
				data.affiliation === 'Out of the Darkness Community Walk') && (
				<>
					<label htmlFor="chapter">Chapter</label>
					<Controller
						as={Select}
						className="react-select__control"
						classNamePrefix="react-select"
						name="chapter"
						control={control}
						options={chapters}
						value={data.chapter}
						onChange={data => {
							onSelectChange(data)
						}}
					/>
					{data.affiliation === 'Chapter' && (
						<>
							<Toggle
								name="showAddress"
								onChange={e => {
									if (e.target.checked) {
										setShowAddress(true)
									} else {
										setShowAddress(false)
									}
								}}
							/>
							<label htmlFor="showAddress">
								Show address on business card?
							</label>
							{showAddress && (
								<>
									<label htmlFor="address1">Address 1</label>
									<input
										ref={register}
										type="text"
										name="address1"
										id="address1"
										onChange={onInputChange}
									/>
									<label htmlFor="address2">Address 2</label>
									<input
										ref={register}
										type="text"
										name="address2"
										id="address2"
										onChange={onInputChange}
									/>
									<label htmlFor="city">City</label>
									<input
										ref={register}
										type="text"
										name="city"
										id="city"
										onChange={onInputChange}
									/>
									<label id="state" htmlFor="state">
										State
									</label>
									<Controller
										as={Select}
										className="react-select__control"
										classNamePrefix="react-select"
										name="state"
										control={control}
										options={states}
										value={data.state}
										onChange={data => {
											onSelectChange(data)
										}}
									/>
									<label htmlFor="zipCode">Zip Code</label>
									<input
										ref={register}
										type="text"
										name="zipCode"
										id="zipCode"
										onChange={onInputChange}
									/>
								</>
							)}
						</>
					)}
				</>
			)}
			<label htmlFor="URL">URL</label>
			<div id="urlWrapper">
				<span>afsp.org/</span>
				<input
					ref={register}
					type="text"
					name="URL"
					id="URL"
					onChange={onInputChange}
				/>
			</div>
			<input type="submit" value="Download PDF" />
		</form>
	)
}

export default BusinessForm
