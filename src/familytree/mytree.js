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
            // nodeMenu: {
            //     edit: { text: 'Chỉnh sửa' },
            //     details: { text: 'Thông tin' },
            // },
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