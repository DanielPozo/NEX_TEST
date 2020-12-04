<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class ActivityType extends AbstractType {

    public function buildForm(FormBuilderInterface $builder, array $optiones) {
        $builder->add('name', TextType::class, array(
            'label' => 'Nombre '
        ))->add('submit', SubmitType::class, array(
            'label' => 'Grabar',
            'attr' => ['class' => 'btn-success']
        ));
    }

}
