// eslint-disable-next-line
import React, { Component } from 'react';
import FamilyTree from "./familytree.js";
import { updateData, deleteData } from '../db/user.js';


export default class Tree extends Component {

    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        // FamilyTree.templates.tommy_male.img_0 =
        //     `<clipPath id="ulaImg"><circle cx="100" cy="150" r="40"></circle></clipPath>
        //     <image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="60" y="110" width="80" height="100"></image>`;

        FamilyTree.elements.myTextArea = function (data, editElement, minWidth, readOnly) {
            var id = FamilyTree.elements.generateId();
            var value = data[editElement.binding];
            if (value == undefined) value = '';
            if (readOnly && !value) {
                return {
                    html: ''
                };
            }
            var rOnlyAttr = readOnly ? 'readonly' : '';
            var rDisabledAttr = readOnly ? 'disabled' : '';
            return {
                html: 
                `<div class="bft-form-field bft-form-field-ct" style="min-width: 280px;">
                    <label for="${id}">${editElement.label}</label>
                    <textarea ${rDisabledAttr} ${rOnlyAttr} id="${id}" name="${id}" style="width: 95%;height: 150px;" data-binding="${editElement.binding}">${value}</textarea>
                </div>`,
                id: id,
                value: value
            };
        };

        this.family = new FamilyTree(document.getElementById("tree"), {
            mode: 'dark',
            template: 'tommy',
            nodes: this.props.nodes,

            nodeBinding: {
                field_0: 'name',
                field_1: 'born',
                img_0: 'photo',

            },
            showXScroll: FamilyTree.scroll.visible,
            showYScroll: FamilyTree.scroll.visible,
            mouseScroll: FamilyTree.action.ctrlZoom,
            scaleInitial: FamilyTree.match.boundary,
            mouseScrool: FamilyTree.none,
            nodeTreeMenu: true,
            editForm: {
                titleBinding: "name",
                photoBinding: "photo",
                generateElementsFromFields: false,
                elements: [
                    { type: 'textbox', label: 'Họ Và Tên', binding: 'name' },
                    { type: 'textbox', label: 'Email', binding: 'email' },
                    {
                        type: 'select', options: [
                            { value: 'female', text: 'Nữ' },
                            { value: 'male', text: 'Nam' }
                        ],
                        label: 'Giới tính', binding: 'gender'
                    },
                    [
                        { type: 'textbox', label: 'Số điện thoại', binding: 'phone' },
                        { type: 'date', label: 'Ngày sinh', binding: 'born' }
                    ],
                    { type: 'textbox', label: 'Địa chỉ', binding: 'city' },
                    { type: 'textbox', label: 'Hình ảnh', binding: 'photo' },
                    { type: 'myTextArea', label: 'Tiểu sử:', binding: 'bio' }
                ],
            },
        });

        this.family.on('field', function (sender, args) {
            if (args.name === 'born') {
                var date = new Date(args.value);
                args.value = date.toLocaleDateString();
            }
        });

        this.family.onUpdateNode((args) => {
            console.log(args, "onUpdateNode");

            if (args.updateNodesData.length > 0) {
                const updateDataArray = args.updateNodesData;
                updateDataArray.forEach(node => {
                    const { id, ...dataToUpdate } = node;
                    updateData(id, dataToUpdate);
                });
            };

            if (args.removeNodeId !== null) {
                console.log(args.removeNodeId, "removeNodeId");
                deleteData(args.removeNodeId);
            }
        });
    }

    render() {
        return (
            <div id="tree" ref={this.divRef}></div>
        );
    }
}